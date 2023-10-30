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
      <Header />
      <AccountContextProvider>
        <Navigation />
      </AccountContextProvider>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
