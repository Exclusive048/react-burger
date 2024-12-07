import PropTypes from 'prop-types'
import { Navigate, useLocation } from 'react-router-dom'

const ProtectedRouteLoginElement = ({ element, isAuth}) => {
	const location = useLocation()
	if (!isAuth) {
		return <Navigate to={"/login"} state={{ from: location.pathname }} />
	}
	return element
}

ProtectedRouteLoginElement.propTypes = {
	element: PropTypes.element.isRequired,
	user: PropTypes.bool,
}

export default ProtectedRouteLoginElement