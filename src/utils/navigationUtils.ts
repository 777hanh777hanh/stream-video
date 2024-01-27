import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '~/routes';

const goBackPublic = () => {
    const navigate = useNavigate();

    const handleGoBack = (slug?: string) => {
        if (window.history.state.idx > 0) {
            navigate(-1);
        } else {
            if (slug) {
                navigate(routes.watch.replace(':slug', slug));
            } else {
                navigate(routes.home);
            }
        }
    };

    return useCallback(handleGoBack, [navigate]);
};

// const handlePrivateGoBack = () => {}

export { goBackPublic };
