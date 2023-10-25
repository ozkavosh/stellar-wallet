import { ThemeProvider } from "styled-components"
import { GlobalStyles } from "./styles/Global"
import { theme } from "./styles/Theme"
import Home from "./pages/Home"
import Header from "./components/Header"

function App() {

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {/*TODO Temporary placement, routing goes here*/}
      <Header />
      <Home />
    </ThemeProvider>
  )
}

export default App
