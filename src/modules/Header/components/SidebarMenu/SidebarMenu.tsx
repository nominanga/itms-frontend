import {useState} from "react";
import {useTranslation} from "react-i18next";
import {
    Menu,
    ChevronDown,
    Settings,
    Bell,
    FileBarChart2,
    Users,
} from "lucide-react";
import {TAB_CONFIG} from "../../../../types/constants/TabConfig.ts";
import {useTabStore} from "../../../../store/TabStore.ts";
import "./SidebarMenu.css";

const NAV_ITEMS = Object.entries(TAB_CONFIG).filter(
    ([key]) => key !== "project"
);

const CONFIG_ITEMS: {key: string; icon: React.ReactNode; label: string}[] = [
    {key: "settings", icon: <Settings size={28}/>, label: "sidebar.settings"},
    {key: "notifications", icon: <Bell size={28}/>, label: "sidebar.notifications"},
    {key: "report_templates", icon: <FileBarChart2 size={28}/>, label: "sidebar.report_templates"},
    {key: "users", icon: <Users size={28}/>, label: "sidebar.users"},
];

const SidebarMenu = () => {
    const {t} = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [configExpanded, setConfigExpanded] = useState(false);
    const openTab = useTabStore(s => s.openTab);

    return (
        <>
            <button
                className="sidebar-toggle-btn"
                onClick={() => setIsOpen(o => !o)}
                aria-label="Toggle sidebar"
            >
                <Menu size={36} color="white"/>
            </button>

            {isOpen && (
                <div className="sidebar-backdrop" onClick={() => setIsOpen(false)}/>
            )}

            <nav className={`sidebar ${isOpen ? "sidebar--open" : "sidebar--closed"}`}>
                <ul className="sidebar-list">
                    {NAV_ITEMS.map(([key, {icon: Icon}]) => (
                        <li key={key}>
                            <button
                                className="sidebar-item"
                                onClick={() => {
                                    openTab(key);
                                    setIsOpen(false);
                                }}
                                title={isOpen ? undefined : t(`tab_titles.${key}`)}
                            >
                                <span className="sidebar-item-icon">
                                    <Icon size={28}/>
                                </span>
                                {isOpen && (
                                    <span className="sidebar-item-label">
                                        {t(`tab_titles.${key}`)}
                                    </span>
                                )}
                            </button>
                        </li>
                    ))}

                    <li>
                        <button
                            className={`sidebar-item sidebar-item--group ${configExpanded ? "sidebar-item--group-open" : ""}`}
                            onClick={() => setConfigExpanded(e => !e)}
                            title={isOpen ? undefined : t("sidebar.configuration")}
                        >
                            <span className="sidebar-item-icon">
                                <Settings size={28}/>
                            </span>
                            {isOpen && (
                                <>
                                    <span className="sidebar-item-label">
                                        {t("sidebar.configuration")}
                                    </span>
                                    <ChevronDown
                                        size={22}
                                        className={`sidebar-chevron ${configExpanded ? "sidebar-chevron--up" : ""}`}
                                    />
                                </>
                            )}
                        </button>

                        <ul className={`sidebar-submenu ${configExpanded && isOpen ? "sidebar-submenu--open" : ""}`}>
                            {CONFIG_ITEMS.map(item => (
                                <li key={item.key}>
                                    <button className="sidebar-item sidebar-item--sub">
                                        <span className="sidebar-item-icon">{item.icon}</span>
                                        <span className="sidebar-item-label">{t(item.label)}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default SidebarMenu;
