import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { TRoute } from '../utils/types/route';

const ProtectedRouteLoginElement: FC<TRoute> = ({ element, isAuth }) => {
	const location = useLocation()
	if (!isAuth) {
		return <Navigate to={"/login"} state={{ from: location.pathname }} />
	}
	return element
}

export default ProtectedRouteLoginElement