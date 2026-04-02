import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import AppPage from "./pages/AppPage/AppPage.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Toaster} from "sonner";
import RouterPage from "./pages/RouterPage/RouterPage.tsx";
import AuthRedirect from "./pages/AuthRedirect/AuthRedirect.tsx";

const queryClient = new QueryClient()

function App() {
  return (
    <>
        <Toaster/>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path={"/login"} element={<LoginPage/>}/>
                    <Route path={"/app"} element={
                        <AuthRedirect>
                            <AppPage/>
                        </AuthRedirect>
                    }/>
                    <Route index element={<RouterPage/>}/>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    </>
  )
}

export default App


