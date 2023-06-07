import React , {useState, useEffect} from 'react';
import Image from 'next/image';

const Profile = ({openProfile , setOpenProfile, currentUser, getShipmentCount}) => {
  
  const [count , setCount] = useState();

  useEffect (() => {
    const getShipmentsData = getShipmentCount();
    
    return async () => {
      const allData = await getShipmentsData;
      setCount(allData);
    };
  }, []);

  return openProfile ? (
    <div className='fixed inset-0 z-10 overflow-y-auto'>
      <div className='fixed inset-0 w-full bg-black opacity-40' onClick={() => setOpenProfile(false)}>

      </div>
    </div>
  ) : (
    ""
  )
}

export default Profile;