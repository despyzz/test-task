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
`

// const StyledButton = styled.div`
//     transition: 0.3s;
//
//     color: var(--btn-light-color);
//     background: var(--btn-light-bg);
//     font-weight: 600;
//     border-radius: 20px;
//     padding: 8px 12px;
//     width: fit-content;
//
//     &:hover {
//         color: var(--btn-light-color-hover);
//         background: var(--btn-light-bg-hover);
//     }
// `

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