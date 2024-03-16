'use client'

import {useCallback, useEffect, useState} from "react";
import {Operator} from "@/app/lib/definitions";
import {fetchOperators} from "@/app/lib/data";
import {Card} from "@/app/Card";
import styled from "styled-components";
import {Container} from "@/app/ui/common/Container";
import {AppError} from "@/app/ui/common/AppError";
import {Button} from "@/app/ui/common/Button"

// firstly fetch only 3 operators
const FETCH_LIMIT = 3;

const StyledWrapper = styled.div`
    margin: 40px 0;
    display: flex;
    flex-direction: column;
    gap: 30px;
`

export default function CardWrapper() {

  const [operators, setOperators] = useState<Operator[]>([])
  const [showAll, setShowAll] = useState<boolean>(false);

  const [error, setError] = useState<boolean>(false);
  const [addError, setAddError] = useState<boolean>(false);

  const fetchData = useCallback(async (limit?: number) => {
    setError(false)
    setAddError(false)

    fetchOperators(limit)
      .then(response => {
        if (!response.ok) throw new Error('Server error');
        return response.json();
      })
      .then(newOperators => {
        // add only new operators
        setOperators(prevOperators => {
          const uniqueOperators = newOperators.filter(
            (newOperator: Operator) => !prevOperators.some(operator => operator.id === newOperator.id)
          );
          return [...prevOperators, ...uniqueOperators];
        });
      })
      .catch(() => {
        limit ? setError(true) : setAddError(true);
      });
  }, []);

  useEffect(() => {
    fetchData(FETCH_LIMIT);
  }, []);

  if (error) {
    return (
      <Container>
        <AppError>
          <div>Ошибка при получении операторов с сервера</div>
          <Button
            onClick={() => fetchData(FETCH_LIMIT)}
          >
            Повторить попытку
          </Button>
        </AppError>
      </Container>
    );
  }

  return (
    <Container>
      <StyledWrapper>
        {
          operators.map(operator => <Card operator={operator} key={operator.id}/>)
        }
        {
          !showAll &&
          <Button
            align={'center'}
            onClick={() => {
              fetchData();
              setShowAll(true);
            }}
          >
            Показать всех операторов
          </Button>
        }
        {
          addError &&
          <AppError>
            <div>Не удалось загрузить всех операторов</div>
            <Button onClick={() => fetchData()}>
              Попробовать снова
            </Button>
          </AppError>
        }
      </StyledWrapper>
    </Container>
  )
}