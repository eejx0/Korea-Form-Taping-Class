import "./styles/index.css";
import Router from './router';
import { ThemeProvider } from "styled-components";
import { /* lightTheme, */ darkTheme } from "./styles/theme";
// import { useState } from "react";
import { GlobalStyle } from "./styles/globalStyle.style";

function App() {
  // 다크모드 고정 (라이트모드 비활성화)
  // const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const isDarkMode = true;
  const setIsDarkMode = () => {}; // 임시 빈 함수

  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />
      <Router isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
    </ThemeProvider>
  );
}

export default App;
