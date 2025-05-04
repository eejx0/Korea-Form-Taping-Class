import { Route, BrowserRouter, Routes } from "react-router-dom";
import { GlobalStyle } from "./styles/globalStyle.style";
import { Home } from "./pages/home";
import { Greeting } from "./pages/classIntroduce/greeting";
import { History } from "./pages/classIntroduce/history";
import { Teacher } from "./pages/classIntroduce/teacher";
import { Process } from "./pages/education/process";

function Router () {
    return (
        <BrowserRouter>
            <GlobalStyle />
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/introduce/greeting" element={<Greeting />}/>
                <Route path="/introduce/history" element={<History />}/>
                <Route path='/introduce/teacher' element={<Teacher />}/>
                <Route path="/education/process" element={<Process />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;