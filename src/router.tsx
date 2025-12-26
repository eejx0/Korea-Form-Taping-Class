import { Route, BrowserRouter, Routes } from "react-router-dom";
import { GlobalStyle } from "./styles/globalStyle.style";
import { Home } from "./pages/home";
import { Greeting } from "./pages/classIntroduce/greeting";
import { History } from "./pages/classIntroduce/history";
import { Teacher } from "./pages/classIntroduce/teacher";
import { EducationProcess } from "./pages/education/process";
import { EducationSchedule } from "./pages/education/schedule/schedule";
import { EducationScheduleDetail } from "./pages/education/schedule/detail";
import { EducationScheduleWrite } from "./pages/education/schedule/write";
import { EducationRegistration } from "./pages/education/registration";
import { EducationScheduleEdit } from "./pages/education/schedule/edit";
import { FormTapingList } from "./pages/formTaping/list";
import { FormTapingDetail } from "./pages/formTaping/detail";
import { FormTapingWrite } from "./pages/formTaping/write";
import { TapingManagerList } from "./pages/tapingManager/list";
import { TapingManagerDetail } from "./pages/tapingManager/detail";
import { TapingManagerWrite } from "./pages/tapingManager/write";
import { ClassAlbumList } from "./pages/classAlbum/list";
import { ClassAlbumWrite } from "./pages/classAlbum/write";
import { ClassAlbumDetail } from "./pages/classAlbum/detail";
import { Header } from "./components/header";
import { Sns } from "./pages/sns";

function Router ({isDarkMode, setIsDarkMode}: {isDarkMode: boolean, setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;}) {
    return (
        <BrowserRouter>
            <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
            <GlobalStyle />
            <Routes>
                <Route path="/main/" element={<Home />}/>
                <Route path="/main/introduce/greeting" element={<Greeting />}/>
                <Route path="/main/introduce/history" element={<History />}/>
                <Route path='/main/introduce/teacher' element={<Teacher />}/>
                <Route path="/main/education/process" element={<EducationProcess />}/>
                <Route path="/main/education/schedule" element={<EducationSchedule />}/>
                <Route path="/main/education/schedule/:id" element={<EducationScheduleDetail />}/>
                <Route path="/main/education/schedule/edit/:id" element={<EducationScheduleEdit />}/>
                <Route path="/main/education/schedule/add" element={<EducationScheduleWrite />}/>
                <Route path="/main/education/registration" element={<EducationRegistration />}/>
                <Route path="/main/formTaping" element={<FormTapingList />}/>
                <Route path="/main/formTaping/:id" element={<FormTapingDetail />}/>
                <Route path="/main/formTaping/add" element={<FormTapingWrite />}/>
                <Route path="/main/tapingManager" element={<TapingManagerList />}/>
                <Route path="/main/tapingManager/:id" element={<TapingManagerDetail />}/>
                <Route path="/main/tapingManager/add" element={<TapingManagerWrite />}/>
                <Route path="/main/classAlbum" element={<ClassAlbumList />}/>
                <Route path="/main/classAlbum/add" element={<ClassAlbumWrite />}/>
                <Route path="/main/classAlbum/:id" element={<ClassAlbumDetail />}/>
                <Route path="/main/sns" element={<Sns />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;