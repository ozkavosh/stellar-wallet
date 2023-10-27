import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/Global";
import { theme } from "./styles/Theme";
import Header from "./components/Header";
import { Navigation } from "./routes";
import { AccountContextProvider } from "./context/AccountContext";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Header />
      <AccountContextProvider>
        <Navigation />
      </AccountContextProvider>
    </ThemeProvider>
  );
}

export default App;
