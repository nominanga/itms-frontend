import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import AppPage from "./pages/AppPage/AppPage.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path={"/login"} element={<LoginPage/>}/>
          <Route index element={<AppPage/>}/>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App


