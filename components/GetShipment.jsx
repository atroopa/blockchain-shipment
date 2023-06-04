import React, { useState } from 'react'

const getShipment = ({
  getModel,
  setGetModel,
  getShipment
}) => {

  const [index, setIndex] = useState(0);
  const [singleShipmentData , setSingleShipmentData] = useState();

  const getShipmentData = async () => {
    const getData = await getShipment(index);
    setSingleShipmentData(getData);
    console.log("From GetShipment Components: ", getData);
  }

  const convertTime = (time) => {
    const newTime = new Date(time);
    const dateTime = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).format(newTime);

    return dateTime;
  };



  return getModel ? (
    <div className='fixed inset-0 z-10 overflow-y-auto'>
      <div className='fixed inset-0 w-full h-full bg-black opacity-40'
        onClick={setGetModel(false)}
      >
      </div>
      <div className='flex items-center min-h-screen px-4 py-8'>
        <div className='relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg'>
          <div className='flex justify-end'>
            <button className='p-2 text-gray-400 rounded-md hover:bg-gray-100' onClick={() => setGetModel(false)}>
            
            </button>

          </div>
        </div>

      </div>
    </div>
  ): ""
}

export default getShipment