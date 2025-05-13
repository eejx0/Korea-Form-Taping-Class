import "./styles/index.css";
import Router from './router';
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./styles/theme";
import { useState } from "react";
import { GlobalStyle } from "./styles/globalStyle.style";

function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Router isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
    </ThemeProvider>
  );
}

export default App;
