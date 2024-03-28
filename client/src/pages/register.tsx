import { Button } from '@material-tailwind/react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../store';
import referralService from '../services/referralService';
import { useEffect } from 'react';

const Register = () => {

  const [searchParams] = useSearchParams();
  const isLoggedIn = useAppSelector((state) => state.app.isLoggedIn)

  useEffect(() => {
      if (searchParams.get("referralCode") && !isLoggedIn
      ) {
         referralService.validateReferralCode(searchParams.get("referralCode")).then((resp) => {
          console.log(resp);
         }).catch((error) => {
          console.log(error)
         })   
      }
  }, [searchParams.get("referralCode")
  ])

    const handleLogin = (provider: string) => {
        console.log(`Logging in with ${provider}`);
        window.location.href = `http://localhost:3000/auth/${provider.toLowerCase()}${ searchParams.get("referralCode") ? `?referralCode=${searchParams.get("referralCode")}` : ""}`
      };

    return <>
     <div className="flex flex-col items-center justify-center gap-3 h-screen mark">
     <Button size="md" placeholder="" onClick={() => handleLogin("Google")}>
        Login With Google
      </Button>
      <Button size="md" placeholder="" onClick={() => handleLogin("Twitter")}>
        Login With Twitter
      </Button>
      <Button size="md" placeholder="" onClick={() => handleLogin("Twitter")}>
        Login With Apple
      </Button>
      <Button size="md" placeholder="" onClick={() => handleLogin("Twitter")}>
        Login With Wallet
      </Button>
    </div>
    </>
}

export default Register;