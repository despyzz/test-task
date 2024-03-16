import {IMaskInput} from "react-imask";
import styled from "styled-components";

const InputStyle = `
    font-size: var(--font-m);
    border-radius: 40px;
    border: 2px solid var(--main-light);
    padding: 20px 30px;
    background: transparent;
    color: var(--main-light);
    outline: none;
`
export const PhoneInput = styled(IMaskInput)`
    ${InputStyle}
`

export const AmountInput = styled.input`
    ${InputStyle}
`