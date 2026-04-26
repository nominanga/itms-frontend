import {type FC, useEffect, useRef, useState} from "react";
import {X} from "lucide-react"
import "./Tab.css"
import type {LucideIconType} from "../../../../types/constants/TabConfig.ts";
import {SmallTabSize} from "../../../../types/constants/layoutConstants.ts";

interface TabProps extends React.HTMLProps<HTMLButtonElement> {
    tabTitle: string;
    select: () => void;
    close: () => void;
    isActive: boolean;
    icon: LucideIconType
}



const Tab: FC<TabProps> =  ({tabTitle, select, close, isActive, icon}) => {

    const ref = useRef<HTMLButtonElement>(null)
    const [isTabSmall, setIsTabSmall] = useState(false)
    const IconComponent = icon

    useEffect(() => {
        if (!ref.current) return

        const observer = new ResizeObserver(([entry]) => {
            setIsTabSmall(entry.contentRect.width < SmallTabSize)
        })

        observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])
    
    function closePressed(e: React.MouseEvent<HTMLDivElement>) {
        e.stopPropagation()
        close()
    }
    
    return <button
        className={"tab"}
        onClick={() => select()}
        ref={ref}
    >
        {!isTabSmall &&
            <>
                <IconComponent strokeWidth={2} size={24} viewBox={"0 0 24 24"} color={"black"} className={"tab-icon"}/>
                <span className="tab-spacer" />
                <div className={"tab-title"}>
                    <span>{tabTitle}</span>
                </div>
                <div className={"close-button-container"} onClick={closePressed}>
                    <X className={"close-button"} strokeWidth={3} size={15}/>
                </div>
            </>
        }
        {isTabSmall && !isActive &&
            <>
                <IconComponent strokeWidth={2} size={24} viewBox={"0 0 24 24"} color={"black"} className={"tab-icon"}/>
                <span className="tab-spacer" />
                <div className={"tab-title"}>
                    <span>{tabTitle}</span>
                </div>
            </>
        }
        {isTabSmall && isActive &&
            <>
                <div className={"tab-title"}>
                    <span>{tabTitle}</span>
                </div>
                <div className={"close-button-container"} onClick={closePressed}>
                    <X className={"close-button"} strokeWidth={3} size={15}/>
                </div>
            </>
        }



        {isActive && <div className={"active"}></div>}
    </button>
}

export default Tab