import React from 'react';

const Table = ({ setCreateShipmentModel, allShipmentsData }) => {

  const convertTime = (time) => {
    const newTime = new Date(time);
    const dateTime = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).format(newTime);

    console.log("Time:", newTime);
    console.log("newTime:", dateTime);

    return dateTime;
  };

  console.log(allShipmentsData);

  return (
    <div className='max-w-screen-xl mx-auto px-4 md:px-8'>
      <div className='flex items-center justify-between'>
        <div className='mt-3'>
          <p onClick={() => setCreateShipmentModel(true)} href="#"
            className='inline-block px-4 py-2 text-white duration-150 font-medium
                       bg-gray-800 hover:bg-gray-700 active:bg-gray-900 md:text-sm
                       rounded-lg md:inline-flex'>
            باربری جدید
          </p>
        </div>
        <div className='max-w-lg'>
          <h3 className='text-gray-800 text-xl font-bold sm:text-2xl text-right'>
            ایجاد باربری
          </h3>
          <p className='text-gray-600 mt-2 text-right font-Scheherazade'>
            با ایجاد یک باربری جدید می توانید بر بستر بلاکچین یک بار را ایجاد کنید. آن را پیگیری کنید و در لحظه تحویل بار با راز دیجیتال هزینه آن را ورداخت کنید. این روش از ایمن ترین روش های دنیاست
          </p>
        </div>
      </div>

      <div className='mt-12 shadow-sm border rounded-lg overflow-auto'>
        <table className='w-full table-auto text-sm text-center'>
          <thead className='bg-gray-50 text-gray-600 font-medium border-b'>
            <tr>
              <th className='py-3 px-6 text-center'>وضعت</th>
              <th className='py-3 px-6 text-center'>پرداخت</th>
              <th className='py-3 px-6 text-center'>زمان تحویل</th>
              <th className='py-3 px-6 text-center'>قیمت</th>
              <th className='py-3 px-6 text-center'>فاصله</th>
              <th className='py-3 px-6 text-center'>زمان بارگیری</th>
              <th className='py-3 px-6 text-center'>گیرنده</th>
              <th className='py-3 px-6 text-center'>فرستنده</th>
            </tr>
          </thead>
          <tbody className='text-gray-600 divide-y'>
            {allShipmentsData && allShipmentsData.map((shipment, idx) => (
              <tr key={idx}>
                <td className='px-6 py-4 whitespace-nowrap'>
                  {shipment.status === 0
                    ? "Pending"
                    : shipment.status === 1
                      ? "IN_TRANSIT"
                      : "Delivered"}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  {shipment.isPaid ? "Completed" : "Not Completed"}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  {shipment.deliveryTime}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  {shipment.price} ETH
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  {shipment.distance} KM
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  {convertTime(shipment.pickupTime)}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  {shipment.receiver.slice(0, 15)} ...
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  {shipment.sender.slice(0, 15)} ...
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
