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
import {AmountInput, InputSkeleton, PhoneInput} from "@/app/ui/common/Input";

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
    font-size: var(--font-m);
    line-height: 1;
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
        line-height: 1;
        font-size: var(--font-m);
        color: var(--font-light);
    }
`

const FormSkeleton = styled.div`
    margin-top: 30px;
    background: radial-gradient(50% 50% at 50% 50%, #403A5F 0%, #211E2E 100%);
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);

    padding: clamp(45px, 13vw, 90px) clamp(20px, 12.5vw, 100px);
    border-radius: 40px;

    display: flex;
    flex-direction: column;
    gap: 20px;
`

const TitleSkeleton = styled.div`
    width: clamp(100px, 30vw, 240px);
    height: var(--font-m);
    line-height: 1;
    background: var(--font-light);
    border-radius: 20px;
`

const InputTitleSkeleton = styled.div`
    height: var(--font-m);
    background: var(--font-light);
    border-radius: 20px;
    width: clamp(150px, 30vw, 240px);
`

const ButtonSkeleton = styled.div`
    background: var(--font-light);
    border-radius: 20px;
    text-align: center;
    color: transparent;

    font-family: inherit;
    transition: 0.3s;
    background: var(--btn-light-bg);
    font-weight: 600;
    font-size: var(--font-s);
    padding: 8px 12px;
    width: fit-content;
    outline: none;
    border: none;
    align-self: center;
`

export function Payment({id}: PaymentProps) {
  const router = useRouter()

  const [operator, setOperator] = useState<Operator | null>(null)
  const [fetchError, setFetchError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [phoneValue, setPhoneValue] = useState('');
  const [amountValue, setAmountValue] = useState('');

  const [disabled, setDisabled] = useState(true);

  const fetchData = (id: string) => {
    setFetchError(false);
    setLoading(true);

    fetchOperator(id)
      .then(response => {
        setLoading(false)
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
      {
        loading ?
          <FormSkeleton>
            <TitleSkeleton/>
            <InputGroup>
              <Label>
                <InputTitleSkeleton/>
                <InputSkeleton/>
              </Label>
              <Label>
                <InputTitleSkeleton/>
                <InputSkeleton/>
              </Label>
            </InputGroup>

            <ButtonSkeleton>
              Пополнить
            </ButtonSkeleton>
          </FormSkeleton>
          :
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
      }
    </Container>
  );
}