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

  return (
    <div>StartShipment</div>
  )
}

export default StartShipment