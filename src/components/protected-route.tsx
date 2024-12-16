import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteElementProps {
  element: JSX.Element;
  isAuth: boolean;
}

const ProtectedRouteElement: React.FC<ProtectedRouteElementProps> = ({ element, isAuth }) => {
  const location = useLocation();
  const destination = location.state?.from || "/";
  if (isAuth) {
    return element;
  }
  return <Navigate to={destination} state={{ from: location.pathname }} />;
};

export default ProtectedRouteElement;
