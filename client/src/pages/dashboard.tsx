import React, { useState, useEffect } from 'react';
import referralService from '../services/referralService';

const ReferralComponent = () => {
  const [referralData, setReferralData] = useState([]);

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const data = await referralService.getReferralsByUserId();
        setReferralData(data);
      } catch (error) {
        console.log(error)
      }
    };

    fetchReferrals();
  }, []);

  return (
    <div>
      <h2>Referral Data</h2>
      {referralData && (
        <ul>
          {referralData?.map((referral, index) => (
            <li key={index}>
              <p>Referral Code: {referral.code}</p>
              <ul>
                {referral.registeredUsers.map((user, index) => (
                  <li key={index}>{user.name}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReferralComponent;
