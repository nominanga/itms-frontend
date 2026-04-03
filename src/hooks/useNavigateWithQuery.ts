import { type NavigateOptions, useLocation, useNavigate } from 'react-router-dom';

const useNavigateWithQuery = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (to: string, options: NavigateOptions = {}) => {
        const query = location.search;
        const separator = to.includes('?') ? '&' : '?';
        navigate(`${to}${query ? separator + query.slice(1) : ''}`, options);
    };
};

export default useNavigateWithQuery;