import { FC } from 'react';
import { Container } from "./style";
import { RotatingSquare } from "react-loader-spinner";
import { useAppContext } from "../../context/AppContext";
import { theme } from "../../styles/Theme";

const Loading: FC = () => {
  const {
    appState: { isLoading },
  } = useAppContext();

  return isLoading ? (
    <Container data-test-name="loaderContainer">
      <RotatingSquare
        height="100"
        width="100"
        color={theme.colors.secondary}
        ariaLabel="rotating-square-loading"
        strokeWidth="4"
      />
    </Container>
  ) : null;
};

export default Loading;
