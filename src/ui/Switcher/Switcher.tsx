import type {FC} from "react";

interface SwitcherProps {
    checked: boolean
    setChecked: (value: boolean) => void
}

const Switcher: FC<SwitcherProps> = ({checked, setChecked}) => {

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setChecked(!e.target.checked)
    }

    return <div>
        <input  type={"checkbox"} onChange={handleChange} checked={checked}/>
    </div>
}

export default Switcher