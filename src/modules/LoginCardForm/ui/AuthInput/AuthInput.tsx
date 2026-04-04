import type {FieldError} from "react-hook-form";
import "./AuthInput.css"

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    inputName: string;
    isError?: FieldError;
    errorText?: string;
}

const AuthInput = ({inputName, isError, errorText, ...props}: AuthInputProps) => {

    return <div className="input-container">
        <div className={["input-wrapper", isError ? "error" : ""].join(" ")}>
            <input placeholder=" " {...props}/>
            <label className="auth-input-label">{inputName}</label>
        </div>
        {isError && <div className="error-message">{errorText}</div>}
    </div>
}

export default AuthInput;