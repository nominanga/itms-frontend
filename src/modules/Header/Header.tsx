import LanguageSwitcher from "../../components/LanguageSwitcher/LanguageSwitcher.tsx";
import SidebarMenu from "./components/SidebarMenu/SidebarMenu.tsx";
import "./Header.css"


const Header = () => {
    return <header className={"itms-header"}>
        <div className={"header-content-container"}>
            <div className={"header-content-left"}>
                <SidebarMenu/>
            </div>
            <LanguageSwitcher/>
        </div>
    </header>
}

export default Header