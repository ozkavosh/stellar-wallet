import styled from "styled-components";

export const Container = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1.5rem 0;
  width: 85%;
  margin: auto;
`;

export const Column = styled.div`
  display: flex;
  gap: 1rem;
`;

export const FooterLink = styled.a`
  color: #fff;
  font-size: 1rem;
  font-weight: 400;
  cursor: pointer;
  text-decoration: none;
  transition: 0.3s ease;

  &:hover{
    font-weight: bold;
    transition: 0.3s ease;
  }
`;
