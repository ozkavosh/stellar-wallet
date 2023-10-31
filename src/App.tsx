import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/Global";
import { theme } from "./styles/Theme";
import Header from "./components/Header";
import { Navigation } from "./routes";
import { AccountContextProvider } from "./context/AccountContext";
import Footer from "./components/Footer";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AccountContextProvider>
        <Header />
          <Navigation />
        <Footer />
      </AccountContextProvider>
    </ThemeProvider>
  );
}

export default App;
