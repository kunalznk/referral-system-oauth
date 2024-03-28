import React, { useState } from 'react';
import referralService from '../services/referralService';
import { Link } from 'react-router-dom';

const ReferralCodeGenerator = () => {
  const [referralCode, setReferralCode] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCreateReferralCode = async () => {
    try {
      const createdReferralCode = await referralService.createReferralCode();
      setReferralCode(createdReferralCode.code);
      setCopied(false); 
    } catch (error) {
      console.error('Error creating referral code:', error);
    }
  };

  const handleCopyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
  };

  return (
    <div>
      <button onClick={handleCreateReferralCode}>Generate Referral Code</button>
      {referralCode && (
        <div>
          <p>Referral Code: {referralCode}</p>
          <button onClick={handleCopyReferralCode}>Copy</button>
          {copied && <Link  className='p-2' to={`http://localhost:3000/register?referralCode=${referralCode}`}>{`http://localhost:3000/register?referralCode=${referralCode}`}</Link>}
        </div>
      )}
    </div>
  );
};

export default ReferralCodeGenerator;
