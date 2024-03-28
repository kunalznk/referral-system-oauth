import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import referralService from "../services/referralService";
import ReferralCodeGenerator from "../components/referralGenerator";
import { useAppDispatch, useAppSelector } from "../store";
import appSlice from "../store/slice/appSlice";
import Web3 from "web3";

const Home = () => {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate()
    const isLoggedIn = useAppSelector((state) => state.app.isLoggedIn)
    const [web3, setWeb3] = useState<any>(null);
    const dispatch = useAppDispatch();

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

    useEffect(() => {
        if (searchParams.get("referralCode") && !isLoggedIn
        ) {
           referralService.validateReferralCode(searchParams.get("referralCode")).then((resp) => {
            console.log(resp);
            navigate("/register")
           }).catch((error) => {
            console.log(error)
            navigate("/register")
           })   
        }
    }, [searchParams.get("referralCode")
    ])
    return <div className="p-2">
    {/* <pre>{searchParams.get("referralCode")}</pre> */}
    {isLoggedIn && <ReferralCodeGenerator />}
    <div className="p-2">
        <button onClick={async () => await handleConnect()}>{web3 ? "Connected": "Connect Wallet"}</button>
    </div>
    </div>
}

export default Home;