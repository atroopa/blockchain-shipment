export default ({setCreateShipmentModel, allShipmentsData}) => {

  const convertTime = time => {
    const newTime   = new Date(time);
    const dateTime  = new Intl.DateTimeFormat("en-US", {
      year:  "numeric",
      month: "2-digit",
      day:   "2-digit"
    }).format(newTime);
  }

  
}