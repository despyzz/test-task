import styled from 'styled-components';
import {device} from "@/app/lib/breakpoints";

export const Container = styled.div`
    max-width: 1140px;
    margin: 0 5vw;
    width: calc(100% - 10vw);
    
    @media ${device.desktop} {
        width: 100%;
        margin: 0 auto;
    }
`