import { ThemeProvider } from "styled-components"
import { GlobalStyles } from "./styles/Global"
import { theme } from "./styles/Theme"
import Header from "./components/Header"
import { Navigation } from "./routes"

function App() {

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Header />
      <Navigation />
    </ThemeProvider>
  )
}

export default App
