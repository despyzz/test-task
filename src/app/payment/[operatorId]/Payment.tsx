'use client'

import {Operator} from "@/app/lib/definitions";
import {useEffect, useState} from "react";
import {fetchOperator, sendData} from "@/app/lib/data";
import {useRouter} from "next/navigation";
import {AppError} from "@/app/ui/common/AppError";
import {Button} from "@/app/ui/common/Button";
import {Container} from "@/app/ui/common/Container";
import styled from "styled-components";
import {device} from "@/app/lib/breakpoints";
import {AmountInput, PhoneInput} from "@/app/ui/common/Input";

const COMPLETED_PHONE_NUMBER_LENGTH = 11;
const MIN_AMOUNT = 1
const MAX_AMOUNT = 1000

type PaymentProps = {
  id: string
}

const Form = styled.form`
    margin-top: 30px;
    background: radial-gradient(50% 50% at 50% 50%, #403A5F 0%, #211E2E 100%);
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);

    padding: clamp(45px, 13vw, 90px) clamp(20px, 12.5vw, 100px);
    border-radius: 40px;

    display: flex;
    flex-direction: column;
    gap: 20px;
`

const Title = styled.h1`
    color: var(--font-light)
`

const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;

    @media ${device.desktop} {
        flex-direction: row;

        & > * {
            flex: 1;
        }
    }
`

const Label = styled.label`
    display: flex;
    flex-direction: column;
    gap: 5px;

    div {
        font-size: var(--font-m);
        color: var(--font-light);
    }
`

export function Payment({id}: PaymentProps) {
  const router = useRouter()

  const [operator, setOperator] = useState<Operator | null>(null)
  const [fetchError, setFetchError] = useState<boolean>(false);

  const [phoneValue, setPhoneValue] = useState('');
  const [amountValue, setAmountValue] = useState('');

  const [disabled, setDisabled] = useState(true);

  const fetchData = (id: string) => {
    setFetchError(false);

    fetchOperator(id)
      .then(response => {
        if (!response.ok) throw new Error('Server error');
        return response.json();
      })
      .then(operatorData => setOperator(operatorData))
      .catch(() => setFetchError(true));
  }

  const onSendData = () => {
    sendData({
      phone: phoneValue,
      amount: amountValue
    })
      .then(response => {
        if (!response.ok) throw new Error('Error');
        alert('Платеж принят! Переход на главную страницу...');
        router.push('/');
      })
      .catch(() => {
        alert('Произошла ошибка. Попробуйте снова!');
      });
  }

  useEffect(() => {
    setDisabled(phoneValue.length !== COMPLETED_PHONE_NUMBER_LENGTH || amountValue === '')
  }, [phoneValue, amountValue])

  useEffect(() => {
    fetchData(id)
  }, [id]);

  if (fetchError) {
    return (
      <AppError>
        <div>Не удалось получить данные об операторе</div>
        <Button onClick={() => fetchData(id)}>
          Повторить попытку
        </Button>
      </AppError>
    )
  }

  return (
    <Container>
      <Form>
        <Title>Оператор: {operator?.name}</Title>

        <InputGroup>
          <Label>
            <div>Номер телефона:</div>
            <PhoneInput
              mask='+{7} (000) 000-00-00'
              unmask={true}
              lazy={false}
              value={phoneValue}
              onAccept={(value: string) => setPhoneValue(value)}
              type="tel"
            />
          </Label>

          <Label>
            <div>Сумма:</div>
            <AmountInput
              value={amountValue}
              onChange={({target: {value}}) => {
                if (value === '') {
                  setAmountValue('');
                } else {
                  const numValue = Number(value);
                  if (numValue < MIN_AMOUNT) {
                    setAmountValue(String(MIN_AMOUNT));
                  } else if (numValue > MAX_AMOUNT) {
                    setAmountValue(String(MAX_AMOUNT));
                  } else {
                    setAmountValue(value);
                  }
                }
              }}
              type={"number"}
            />
          </Label>
        </InputGroup>

        <Button
          align={'center'}
          onClick={(event) => {
            event.preventDefault();
            onSendData();
          }}
          disabled={disabled}
        >
          Пополнить
        </Button>
      </Form>
    </Container>
  );
}