import { Navigate, Outlet, useNavigate, useSearchParams } from "react-router-dom";
import Cookies from 'js-cookie';
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import appSlice from "../store/slice/appSlice";

const ProtectedRoutes = () => {

    const [searchParams] = useSearchParams();
    const referralCode = searchParams.get("referralCode")

const isLoggedIn = useAppSelector((state) => state.app.isLoggedIn)
const dispatch = useAppDispatch()

useEffect(() => {
    const jwtToken = Cookies.get('jwtToken');
    dispatch(appSlice.actions.setIsLoggedIn(Boolean(jwtToken)));
}, [isLoggedIn])

 return isLoggedIn ? <Outlet />: <Navigate to={referralCode ?  `/register?referralCode=${referralCode}` : `/register`} replace={false}/>
};

export default ProtectedRoutes;