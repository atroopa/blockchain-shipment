import { useState } from "react";

const Form = ({ setCreateShipmentModel, createShipmentModel, createShipment }) => {
  const [shipment, setShipment] = useState({
    receiver: "",
    pickupTime: "",
    distance: "",
    price: ""
  });

  const createItem = async () => {
    try {
      await createShipment(shipment);
    } catch (error) {
      console.log("from FORM Component: wrong creating item ");
    }
  };

  return createShipmentModel ? (
    <div className="fixed inset-0 z-10 overflow-y-auto ">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={() => setCreateShipmentModel(false)}
      ></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
          <div className="flex justify-end">
            <button
              className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
              onClick={() => setCreateShipmentModel(false)}
            >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  onClick={() => setCreateShipmentModel(false)}
                >
                  <path d="M12 6 L6 12 M6 6 L12 12" />
                </svg>
            </button>
          </div>
          <div className="max-w-sm mx-auto py-3 space-y-3 text-right">
            <h4 className="text-lg font-medium text-gray-800">
            پیگیری محصول، ایجاد حمل و نقل
            </h4>
            <p className="text-[15px] text-gray-600">
             در اینجا یک حمل و نقل ایجاد می شود . تمامی حمل و نقل ها تا قبل از بارگیری قابل ویرایش می باشند لطفا در درستی موارد دقت بفرمایید
            </p>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="relative mt-3">
                <input
                  type="text"
                  placeholder="آدرس دریافت کننده"
                  className="text-right w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) =>
                    setShipment({
                      ...shipment,
                      receiver: e.target.value
                    })
                  }
                />
              </div>
              <div className="relative mt-3">
                <input
                  type="date"
                  placeholder="زمان بارگیری به میلادی"
                  className=" w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) =>
                    setShipment({
                      ...shipment,
                      pickupTime: e.target.value
                    })
                  }
                />
              </div>
              <div className="relative mt-3">
                <input
                  type="text"
                  placeholder="مسافت"
                  className="text-right w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) =>
                    setShipment({
                      ...shipment,
                      distance: e.target.value
                    })
                  }
                />
              </div>
              <div className="relative mt-3">
                <input
                  type="text"
                  placeholder="قیمت"
                  className="text-right w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) =>
                    setShipment({
                      ...shipment,
                      price: e.target.value
                    })
                  }
                />
              </div>
              <button
                onClick={() => createItem()}
                className="block w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg ring-offset-2 ring-indigo-600 focus:ring-2"
              >
                ایجاد حمل و نقل
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Form;