import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRouteElement = ({ element, isAuth}) => {
    const location = useLocation();
    const destination = location.state?.from || "/";
    if(isAuth){
        return element

    }
    return <Navigate to={destination} state={{from :location.pathname}} />
}



ProtectedRouteElement.propTypes = {
	element: PropTypes.element.isRequired,
	isAuth: PropTypes.bool,
}

export default ProtectedRouteElement;