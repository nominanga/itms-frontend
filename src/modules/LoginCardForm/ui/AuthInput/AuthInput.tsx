
interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    inputName: string;
}

const AuthInput = ({inputName, ...props}: AuthInputProps) => {
    return <div>
        <label>{inputName}</label>
        <input {...props}/>
    </div>
}

export default AuthInput;