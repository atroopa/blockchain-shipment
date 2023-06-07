import {useState} from 'react'
import { Str1 } from '@/components/index';




const StartShipment = ({
  startModal,
  setStartModal,
  startShipment
}) => {

  const [getProduct, setGetProduct] = useState({
    receiver: "",
    index: "",
  });


  const startShiping = () => {
    startShipment(getProduct);
  };



  return startModal ? (
    <div className='fixed inset-0 z-10 overflow-y-auto'>
      <div className='fixed inset-0 w-full h-full bg-black opacity-40' onClick={() => startModal(false)}>
      </div>
      <div className='flex items-center min-h-screen px-4 py-8'>
        <div className='relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg'>
          <div className='flex justify-end'>
            <button className='p-2 text-gray-400 rounded-md hover:bg-gray-100' onClick={() => setStartModal(false)}>
              <Str1/>
            </button>
          </div>
          <div className='max-w-sm mx-auto py-3 space-y-3 text-center'>
            
          </div>
        </div>

      </div>
    </div>
  ) : ""
}

export default StartShipment