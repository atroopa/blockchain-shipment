import React from 'react'

const Table = ({setCreateShipmentModel, allShipmentsData}) => {

  const convertTime = time => {
    const newTime   = new Date(time);
    const dateTime  = new Intl.DateTimeFormat("en-US", {
      year:  "numeric",
      month: "2-digit",
      day:   "2-digit"
    }).format(newTime);
    return dateTime;
  };

  console.log(allShipmentsData);

  return (
    <div className='max-w-screen-xl mx-auto px-4 md:px-8'>
      <div className='items-start justify-between md:flex'>

      </div>
    </div>
  )
}

export default Table