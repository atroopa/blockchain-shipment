import {useState} from 'react'


const CompeletShipment = ({compeleteModel , setCompeleteModel, compeletShipment}) => {

  const [completeShip, setCompleteShip] = useState({
    receiver: "",
    index: "",
  });

  const changeStatus = async ()  => {
    compeletShipment(completeShip);
  }

  return compeleteModel ? (
    <div className='fixed inset-0 z-10 overflow-y-auto'>
      <div className='fixed inset-0 w-full h-full bg-black opacity-40' onClick={() => setCompeleteModel(false)}>
        <div className='flex items-center min-h-screen px-4 py-8'>
          <div className='relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg'>
            <div className='flex justify-end'>
              <button className='p-2 text-gray-400 rounded-md hover:bg-gray-400' onClick={() => setCompeleteModel(false)}>
                {/* SVG */}
              </button>
            </div>
            <div className='max-w-sm mx-auto py-3 space-y-3 text-center'>
              <h4 className='text-lg font-medium text-gray-800'>
                Compelete Shipment
              </h4>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className='relative mt-3'>
                  <input 
                    type='text'
                    placeholder='receiver'
                    className='w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg'
                    onChange={(e) => 
                                setCompleteShip({
                                  ...completeShip,
                                  receiver : e.target.value
                                })
                    }
                  />
                </div>
                <div className='relative mt-3'>
                    <input 
                      type='number'
                      placeholder='ID'
                      className='w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg '
                      
                    />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  ): (
    ""
  )
};

export default CompeletShipment;