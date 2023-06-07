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
      <div className='flex items-center min-h-screen px-4 py-8'>
        <div className='relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg'>
          <div className='flex justify-end'>
            <button className='p-2 text-gray-400 rounded-md hover:bg-gray-100' onClick={() => setOpenProfile(false)}>
              {/* SVG */}
            </button>
          </div>
          <div className='max-w-sm mx-auto py-3 space-y-3 text-center'>
            <div className='flex flex-col items-center pb-10'>
              <Image />
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  )
}

export default Profile;