import React ,{useState, useEffect} from 'react';
import Web3Modal from 'web3modal';
import {ethers}  from 'ethers';


// INTERNAL IMPORT
import tracking       from "../context/Tracking.json";
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const contractAbi     = tracking.abi;


// FETCHING SMART CONTRACT 
const fetchContract = (signerOrProvider) => {
    new ethers.Contract(contractAddress, contractAbi, signerOrProvider);
}

export const  TrackingContext = React.createContext();
export const TrackingProvider = ({childeren}) => {
    
    // STATE VARIABLES
    const DappName                      = "Product Tracking Dapp";
    const [currentUser, setCurrentUser] = useState("");

    const creteShipment = async items => {
        console.log(items);
        const {receiver, pickupTime, distance , price} = items;

        try {
            
            const web3Modal  = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider   = new ethers.providers.Web3Provider(connection); 
            const signer     = provider.getSigner();
            const contract   = fetchContract(signer);
            const createItem =  await contract.createShipment(
                receiver,
                new Date[pickupTime].getTime(),
                distance,
                ethers.utils.parseUnits(price, 18),
                {
                    value: ethers.utils.parseUnits(price, 18),
                }                
            );
            
            await createItem.wait();
            console.log("createItem: ", createItem);

        } catch (error) {
            console.error("Some want Wrong", error);
        }

    }

};

const getAllShipment = async () => {
    try {
        
        const provider     = new ethers.providers.JsonRpcProvider()
        const contract     = fetchContract(provider);
        const shipments    = await contract.getAllTransaction();
        const allShipments = shipments.map( (shipment) => ({

            sender      : shipment.sender,
            receiver    : shipment.receiver,
            price       : ethers.utils.formatEther(shipment.price.toString()),
            pickupTime  : shipment.pickupTime.toNumber(),
            deliveryTime: shipment.deliveryTime.toNumber(),
            distance    : shipment.distance.toNumber(),
            isPaid      : shipment.isPaid ,
            status      : shipment.status
        })); 

        return allShipments;

    } catch (error) {
        console.error("error want, getting shipment");
    }
};

