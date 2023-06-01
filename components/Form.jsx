import { useState } from "react";


const Form = ({setCreateShipmentModel, createShipmentModel, createShipment}) => {
  
  const [shipment, setShipment] = useState({
    receiver:   "",
    pickupTime: "",
    distance:   "",
    price:      ""
  });
  
  
  return (
    <div>
      
    </div>
  )
}

export default Form