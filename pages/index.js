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

import {Tracking} from "../context/Tracking"

const index = () => {

  const {
    currentUser,
    createShipment,
    getAllShipment,
    compeletShipment,
    getShipment,
    startShipment,
    getShiomentCount
  } = useContext(Tracking);

  return (
    <div>
      index 
    </div>
  );
};

export default index;