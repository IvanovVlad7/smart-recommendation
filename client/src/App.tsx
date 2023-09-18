import Registration from "./page/registration/registration";
import Login from "./page/login/login";
import Dashboard from "./page/dashboard/dashboard";
import ApiTest from "./page/api-test/api-test";
import MainPage from "./page/main/main";
import { BrowserRouter, Routes, Route} from "react-router-dom";

const App = () => {
  return(
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element = {<Dashboard/>}/>
          <Route path='/test' element={<ApiTest />} />
          <Route path="/" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
