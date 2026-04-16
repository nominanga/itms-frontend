import { type NavigateOptions, useLocation, useNavigate } from 'react-router-dom';

const useNavigateWithQuery = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (to: string, options: NavigateOptions = {}) => {
        const [path, passedSearch] = to.split("?");
        const merged = passedSearch !== undefined
            ? `?${passedSearch}&${location.search.slice(1)}`
            : location.search;
        navigate(`${path}${merged}`, options);
    };
};

export default useNavigateWithQuery;