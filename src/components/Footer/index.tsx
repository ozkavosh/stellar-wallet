import { Container, Column, FooterLink } from "./style";
import { FC } from "react";

const Footer : FC = () => {
  return (
    <Container>
      <Column>
        <FooterLink href="#">Terms of Service</FooterLink>
        <FooterLink href="#">Privacy Policy</FooterLink>
      </Column>
      <Column>
        <FooterLink href="https://github.com/ozkavosh/stellar-wallet">
            GitHub
        </FooterLink>
      </Column>
    </Container>
  );
};

export default Footer;