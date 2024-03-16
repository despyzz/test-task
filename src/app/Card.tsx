'use client'

import {Operator} from "@/app/lib/definitions";
import Link from "next/link";
import styled from 'styled-components'
import {device} from "@/app/lib/breakpoints";
import { Button } from "@/app/ui/common/Button";

type CardProps = {
  operator: Operator
}

const StyledCard = styled(Link)`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    background: var(--main-dark);
    border: 4px solid var(--main-light);
    padding: 24px;
    border-radius: 40px;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.03);
    }
    
    @media ${device.tablet} {
        padding: 40px;
        flex-direction: row;
        justify-content: space-between;
    }
`

const StyledName = styled.p`
    color: var(--font-light);
    text-align: center;
    font-size: var(--font-l);
    font-weight: 900;
    line-height: 1;
`

const StyledCardSkeleton = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    background: var(--main-dark);
    border: 4px solid var(--main-light);
    padding: 24px;
    border-radius: 40px;
    transition: transform 0.3s ease;

    @media ${device.tablet} {
        padding: 40px;
        flex-direction: row;
        justify-content: space-between;
    }
`

const StyledNameSkeleton = styled.div`
    background: var(--font-light);
    border-radius: 20px;
    text-align: center;
    height: var(--font-l);
    width: clamp(100px, 30vw, 240px);
    font-weight: 900;
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

`

export function CardSkeleton() {
  return (
    <StyledCardSkeleton>
      <StyledNameSkeleton/>
      <ButtonSkeleton>
        Оплатить
      </ButtonSkeleton>
    </StyledCardSkeleton>
  );
}

export function Card({operator}: CardProps) {
  return (
    <StyledCard href={`/payment/${operator.id}`}>
      <StyledName>
        {operator.name}
      </StyledName>

      <Button>
        Оплатить
      </Button>
    </StyledCard>
  );
}