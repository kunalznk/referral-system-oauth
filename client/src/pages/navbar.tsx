import { useSDK } from '@metamask/sdk-react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useAppDispatch } from '../store';
import appSlice from '../store/slice/appSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Web3 from 'web3';


const Navbar = () => {

  const [web3, setWeb3] = useState<any>(null);
    const dispatch = useAppDispatch();
    const navigate =  useNavigate()

    const jwtToken = Cookies.get('jwtToken');


  const handleLogout = () => {
    axios.post("http://localhost:3000/auth/logout", {} , {
      withCredentials: false
    }).then(() => {
        Cookies.remove("jwtToken");
        Cookies.remove("refreshToken");
        Cookies.remove("accessToken");
        dispatch(appSlice.actions.setIsLoggedIn(Boolean(false)));
        navigate("/")
    });
  };

  const handleConnect = async () => {
         if (window.ethereum) {
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);
  
          try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            dispatch(appSlice.actions.setIsWalletConnected(true));
          } catch (error) {
            console.error('Error connecting to MetaMask:', error);
          }
        } else {
          console.error('MetaMask not detected.');
        }

  };

  return (
    <nav className="bg-gray-800 p-4">
      <pre>{JSON.stringify(jwtToken, null,2)}</pre>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-around">
            <Link to="/home" className="text-white font-bold text-xl">
              Home
            </Link>
            <Link to="/score" className="text-white font-bold text-xl">
              Score
            </Link>
            <Link to="/referrals" className="text-white font-bold text-xl">
            Referrals
            </Link>
            <Link to="/dashboard" className="text-white font-bold text-xl">
              Dashboard
            </Link>
            <button
              onClick={async () =>  handleConnect}
              className="ml-4 px-3 py-1 bg-red-600 text-white rounded-md"
            >
              Connect Wallet
            </button>
            <button
              onClick={handleLogout}
              className="ml-4 px-3 py-1 bg-red-600 text-white rounded-md"
            >
              Logout
            </button>
          <div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
