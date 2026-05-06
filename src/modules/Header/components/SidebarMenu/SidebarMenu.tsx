import {useState, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {Menu, ChevronDown, BookOpen, Settings, Mail, LogOut} from "lucide-react";
import {TAB_CONFIG} from "../../../../types/constants/TabConfig.ts";
import {useTabStore} from "../../../../store/TabStore.ts";
import {useTokenStore} from "../../../../store/TokenStore.ts";
import {removeAccountInfo} from "../../../../utils/storageAccountInfo.ts";
import baseAPI from "../../../../api/baseAPI.ts";
import {useNavigate} from "react-router-dom";
import "./SidebarMenu.css";

const NAV_ITEMS = Object.entries(TAB_CONFIG).filter(
    ([key]) => !["project", "currencies", "keywords", "legal_notices", "mice_suppliers",
        "new_demand_options", "project_complexities", "project_types", "taxonomy",
        "settings", "notifications", "report_templates", "users", "inbox"].includes(key)
);

const DICT_KEYS = ["currencies", "keywords", "legal_notices", "mice_suppliers",
    "new_demand_options", "project_complexities", "project_types", "taxonomy"];

const CONFIG_KEYS = ["settings", "notifications", "report_templates", "users"];

const SidebarMenu = () => {
    const {t} = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [dictExpanded, setDictExpanded] = useState(false);
    const [configExpanded, setConfigExpanded] = useState(false);
    const openTab = useTabStore(s => s.openTab);
    const navigate = useNavigate();

    const handleItemClick = (key: string) => {
        openTab(key);
        setIsOpen(false);
    };

    const handleLogout = () => {
        useTokenStore.getState().removeToken();
        removeAccountInfo();
        delete baseAPI.defaults.headers.common["Authorization"];
        navigate("/login");
    };

    useEffect(() => {
      if (!isOpen) {
        setDictExpanded(false)
        setConfigExpanded(false)
      }
    }, [isOpen])

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
                                onClick={() => handleItemClick(key)}
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
                            className={`sidebar-item sidebar-item--group ${dictExpanded ? "sidebar-item--group-open" : ""}`}
                            onClick={
                                () => {
                                    setDictExpanded(e => !e)
                                    setIsOpen(true)
                                }
                            }
                            title={isOpen ? undefined : t("sidebar.dictionaries")}
                        >
                            <span className="sidebar-item-icon">
                                <BookOpen size={28}/>
                            </span>
                            {isOpen && (
                                <>
                                    <span className="sidebar-item-label">
                                        {t("sidebar.dictionaries")}
                                    </span>
                                    <ChevronDown
                                        size={22}
                                        className={`sidebar-chevron ${dictExpanded ? "sidebar-chevron--up" : ""}`}
                                    />
                                </>
                            )}
                        </button>

                        <ul className={`sidebar-submenu ${dictExpanded && isOpen ? "sidebar-submenu--open" : ""}`}>
                            {DICT_KEYS.map(key => {
                                const Icon = TAB_CONFIG[key].icon;
                                return (
                                    <li key={key}>
                                        <button
                                            className="sidebar-item sidebar-item--sub"
                                            onClick={() => handleItemClick(key)}
                                        >
                                            <span className="sidebar-item-icon"><Icon size={28}/></span>
                                            <span className="sidebar-item-label">{t(`sidebar.${key}`)}</span>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </li>

                    <li>
                        <button
                            className={`sidebar-item sidebar-item--group ${configExpanded ? "sidebar-item--group-open" : ""}`}
                            onClick={
                                () => {
                                    setConfigExpanded(e => !e)
                                    setIsOpen(true)
                                }
                            }
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
                            {CONFIG_KEYS.map(key => {
                                const Icon = TAB_CONFIG[key].icon;
                                return (
                                    <li key={key}>
                                        <button
                                            className="sidebar-item sidebar-item--sub"
                                            onClick={() => handleItemClick(key)}
                                        >
                                            <span className="sidebar-item-icon"><Icon size={28}/></span>
                                            <span className="sidebar-item-label">{t(`sidebar.${key}`)}</span>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </li>
                </ul>

                <div className="sidebar-bottom">
                    <button
                        className="sidebar-item sidebar-item--inbox"
                        onClick={() => handleItemClick("inbox")}
                        title={isOpen ? undefined : t("sidebar.inbox")}
                    >
                        <span className="sidebar-item-icon">
                            <Mail size={28}/>
                        </span>
                        {isOpen && (
                            <span className="sidebar-item-label">{t("sidebar.inbox")}</span>
                        )}
                    </button>

                    <button
                        className="sidebar-item sidebar-item--logout"
                        onClick={handleLogout}
                        title={isOpen ? undefined : t("sidebar.logout")}
                    >
                        <span className="sidebar-item-icon">
                            <LogOut size={28}/>
                        </span>
                        {isOpen && (
                            <span className="sidebar-item-label">{t("sidebar.logout")}</span>
                        )}
                    </button>
                </div>
            </nav>
        </>
    );
};

export default SidebarMenu;
