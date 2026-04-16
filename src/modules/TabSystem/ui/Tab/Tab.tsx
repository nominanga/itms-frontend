import type {FC} from "react";

interface TabProps extends React.HTMLProps<HTMLButtonElement> {
    tabTitle: string;
    select: () => void;
    close: () => void;
    isActive: boolean;
}

const Tab: FC<TabProps> =  ({tabTitle, select, close, isActive}) => {
    
    function closePressed(e: React.MouseEvent<HTMLDivElement>) {
        e.stopPropagation()
        close()
    }
    
    return <button
        className={["tab", isActive ? "tab-active" : ""].join(" ")}
        onClick={() => select()}
        style={{
            background: isActive ? "red" : ""
        }}
    >
        <span>{tabTitle}</span>
        <div onClick={closePressed}>close</div>
    </button>
}

export default Tab