import type {FC} from "react";

interface SwitcherProps {
    checked: boolean
    setChecked: (value: boolean) => void
}

const Switcher: FC<SwitcherProps> = ({checked, setChecked}) => {

    function handleChange() {
        setChecked(!checked)
    }

    return <div>
        <input  type={"checkbox"} onChange={handleChange} checked={checked}/>
    </div>
}

export default Switcher