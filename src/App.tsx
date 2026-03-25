import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import AuthRedirect from "./utils/AuthRedirect.tsx";
import AppPage from "./pages/AppPage/AppPage.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/login"} element={<LoginPage/>}/>
        <Route index element={
          <AuthRedirect>
            <AppPage/>
          </AuthRedirect>
        }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App


