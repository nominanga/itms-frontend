import type {FC} from "react";
import "./Switcher.css"

interface SwitcherProps {
    checked: boolean
    setChecked: (value: boolean) => void
}

const Switcher: FC<SwitcherProps> = ({checked, setChecked}) => {

    function handleChange() {
        setChecked(!checked)
    }

    return <label className="switch">
        <input  type={"checkbox"} onChange={handleChange} checked={checked}/>
        <span className="slider round"></span>
    </label>
}

export default Switcher