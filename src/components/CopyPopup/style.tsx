import styled from "styled-components";

export const PopupWrapper = styled.div`
    position: relative;
`;

export const Popup = styled.div`
    background-color: ${({theme}) => theme.colors.secondary};
    color: ${({theme}) => theme.colors.tertiary};
    display: flex;
    justify-content: center;
    font-weight: bold;
    position: absolute;
    top: calc(100% + 5px);
    left: 15%;
    right: 15%;
    border-radius: 2px;
    padding: 5px 10px;

    &::before {
        content: "";
        position: absolute;
        bottom: 100%;
        left: 50%;
        margin-left: -10px;
        border-width: 10px;
        border-style: solid;
        border-color: transparent transparent ${({theme}) => theme.colors.secondary} transparent;
    }
`;