import Registration from "./page/registration/registration";
import Login from "./page/login/login";
import Dashboard from "./page/dashboard/dashboard";
import MainPage from "./page/main/main";
import { BrowserRouter, Routes, Route} from "react-router-dom";


const App = () => {
  return(
  <div>
    <BrowserRouter>
      <Routes>
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Dashboard" element = {<Dashboard/>}/>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  </div>);
};

export default App;
