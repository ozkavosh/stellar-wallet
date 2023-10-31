import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/Global";
import { Navigation } from "./routes";
import { AccountContextProvider } from "./context/AccountContext";
import { AppContextProvider } from "./context/AppContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { theme } from "./styles/Theme";
import Loading from "./components/Loading";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppContextProvider>
        <Loading />
        <AccountContextProvider>
          <Header />
            <Navigation />
          <Footer />
        </AccountContextProvider>
      </AppContextProvider>
    </ThemeProvider>
  );
}

export default App;
