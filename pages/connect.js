import React, { useState, useEffect } from 'react';
import { Moralis } from "moralis";


const Connect = () => {
  const [currentUser, setCurrentUser] = useState('');
  const [walletConnected, setWalletConnected] = useState(false);

  useEffect(() => {
    // Initialize Moralis
    Moralis.initialize("dc4bcca4-3643-4bd9-94a9-634cea06a96d");
    Moralis.serverURL = "http://localhost:3000";
  }, []);

  const connectWallet = async () => {
    try {
      const user = await Moralis.authenticate();
      
      if (user) {
        const accounts = await Moralis.Web3.getAllAccounts();
        
        if (accounts.length > 0) {
          const selectedAddress = accounts[0];
          setCurrentUser(selectedAddress);
          setWalletConnected(true);
          console.log("Connected");
        } else {
          console.log("No account");
        }
      } else {
        console.log("No user");
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  return (
    <div>
      <button className='bg-red-100 px-4 py-2 rounded' onClick={connectWallet}>Connect</button>
    </div>
  );
};

export default Connect;
