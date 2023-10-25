import { ThemeProvider } from "styled-components"
import { GlobalStyles } from "./styles/Global"
import { theme } from "./styles/Theme"

function App() {

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
    </ThemeProvider>
  )
}

export default App
