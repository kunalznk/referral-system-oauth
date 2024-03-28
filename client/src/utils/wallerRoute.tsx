import { Navigate, Outlet, useNavigate } from "react-router-dom";

import Cookies from 'js-cookie';
import { useAppSelector } from "../store";

const WalletRoute = () => {
    
    const isWalletConnected = useAppSelector((state) => state.app.isWalletConnected)

    return isWalletConnected ? <Outlet />: <Navigate to={"/home"} replace={false}/>

};

export default WalletRoute;