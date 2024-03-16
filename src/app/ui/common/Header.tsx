'use client'

import Link from "next/link";
import styled from 'styled-components';
import { Container } from "@/app/ui/common/Container";

const StyledHeader = styled.header`
    display: flex;
    align-items: center;
    justify-content: center;
    
    background: var(--main-light);
    border-radius: 0 0 clamp(20px, 14vw, 90px) clamp(20px, 14vw, 90px);
    padding: clamp(10px, 5vw, 40px);
`

const Logo = styled(Link)`
    font-size: clamp(32px, 10vw, 90px);
    font-weight: 900;
    color: var(--main-dark);
    transition: 0.3s;
    
    padding-bottom: 2px;
    border-bottom: 6px solid transparent;
    
    &:hover {
        border-bottom: 6px solid var(--main-dark)
    }
`

export const Header = () => {
  return (
    <Container>
      <StyledHeader>
        <Logo href={'/'}>
          Терминал
        </Logo>
      </StyledHeader>
    </Container>
  );
}