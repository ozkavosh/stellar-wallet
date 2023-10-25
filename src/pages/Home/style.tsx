import styled from "styled-components"

export const Title = styled.h2`
    font-size: 3rem;
    color: ${props => props.theme.colors.primary};
    margin-bottom: 3rem;
`;

export const Container = styled.div`
    display: flex;
    min-height: calc(100vh - 10rem);
    padding: 0 5%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export const ButtonContainer = styled.div`
    display: flex;
    padding: 1em;
    width: fit-content;
    height: fit-content;
    gap: 1em;
    flex-direction: column;
`;