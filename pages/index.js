import React , {useState, useEffect, useContext}from 'react';

// INTERNAL IMPORT
import {
  Table,
  Form,
  Services,
  Profile,
  CompeletShipment,
  GetShipment,
  StartShipment
  
} from "@/components"

import {ThemeContext} from "../context/Tracking"



const index = () => {
  const {
    createShipment,
    getAllShipment,
    compeletShipment,
    getShipment,
    startShipment,
    getShiomentCount,
    currentUser,
  } = useContext(ThemeContext);
  
  // STATE VARIABLE
  const [createShipmentModel, setCreateShipmentModel] = useState(false);
  const [openProfile , setOpenProfile]                = useState(false);
  const [startModel, setStartModel]                   = useState(false);
  const [compeleteModel, setCompeleteModel]           = useState(false);
  const [getModel, setGetModel]                       = useState(false);

  // DATA SET VARIABLE
  const [allShipmentsData, setAllShipmentData]        = useState(false);

  useEffect(() => {
    const getCampaignsData = getAllShipment();

    return async () => {
      const allData = await getCampaignsData;
      setAllShipmentData(allData);
    };
  }, []);

  return (
    <div>
      <Services
        setOpenProfile    = {setOpenProfile}
        setCompeleteModel = {setCompeleteModel}
        setGetModel       = {setGetModel}
        setStartModel     = {startModel}
      /> 
    </div>
  );
};

export default index;