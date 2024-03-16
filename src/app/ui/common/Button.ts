import styled from 'styled-components';

type AlignSelfValues = 'auto' | 'start' | 'end' | 'center' | 'baseline' | 'stretch';

interface ButtonProps {
  align?: AlignSelfValues;
}

export const Button = styled.button<ButtonProps>`
    font-family: inherit;
    transition: 0.3s;
    color: var(--btn-light-color);
    background: var(--btn-light-bg);
    font-weight: 600;
    font-size: var(--font-s);
    border-radius: 20px;
    padding: 8px 12px;
    width: fit-content;
    outline: none;
    border: none;
    cursor: pointer;
    align-self: ${props => props.align ? props.align : 'auto'};
    
    &:hover {
        color: var(--btn-light-color-hover);
        background: var(--btn-light-bg-hover);
    }

    &:disabled {
        color: var(--btn-light-color-disabled);
        background: var(--btn-light-bg-disabled);
        cursor: not-allowed;
    }
`
