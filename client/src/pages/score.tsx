import React, { useState, useEffect } from 'react';
import axios from 'axios';
import referralService from '../services/referralService';

const Score = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsersWithInfo = async () => {
      try {
        const response = await referralService.getScore();
        setUsers(response);
        
      } catch (error) {
        console.error('Error fetching users with info:', error);
      }
    };

    fetchUsersWithInfo();
  }, []);

  return (
    <div>
      <h2>Users with Scores and Custom Information</h2>
      <table>
        <thead>
          <tr>
          <th>ID</th>
            <th>Name</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Score;
