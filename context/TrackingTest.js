import { createContext, useContext, useState , useEffect} from "react";
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

const  TrackingContext = createContext();

export const TrackingProvider = ({childeren}) => {
    
    // STATE VARIABLES
    const DappName                      = "Product Tracking Dapp";
    const [currentUser, setCurrentUser] = useState("");

    const createShipment = async items => {
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

//};

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

    const getShipmentCount =  async () => {

        try {
            
            if (!window.ethereum) return "Install MetaMask";

            const accounts      = await window.ethereum.request({ method: "eth_accounts", });
            const provider      = new ethers.providers.JsonRpcProvider();
            const contract      = fetchContract(provider);
            const shipmentCount = contract.getShipmentCount(accounts[0]);
            return shipmentCount.toNumber();

        } catch (error) {
            console.error("error wnat , getting shipmentCount");
        }

    }

    const compeletShipment = async compeletShip => {
        console.log("compeletShip: " , compeletShip);

        const {receiver, index} = compeletShip;

        try {
            
            if(!window.ethereum) return "Install MetaMask";

            const accounts      = await window.ethereum.request({ method: "eth_accounts", });
            const web3Modal     = new Web3Modal();
            const connection    = await web3Modal.connect();
            const provider      = new ethers.providers.Web3Provider(connection);
            const signer        = provider.getSigner();
            const contract      = fetchContract(signer);
            const transaction   = await contract.compeletShipment(
                                                                    accounts[0],
                                                                    receiver,
                                                                    index,
                                                                    {
                                                                        gasLimit: 30000
                                                                    }
                                                                );


            transaction.wait();
            console.log("transaction: ", transaction);
        } catch (error) {
            console.error("Wrong compeleteShipment");
        }

    };

    const getShipment = async index => {
        console.log(index * 1);

        try {
            
            if(!window.ethereum) return "please Install MetaMask";

            const accounts       = await window.ethereum.request({ method: "eth_accounts", });
            const provider       = new ethers.providers.JsonRpcProvider();
            const contract       = fetchContract(provider);
            const shipment       = contract.getShipment(accounts[0], index * 1);
            const singleShiplent = {
                sender      : shipment[0],
                receiver    : shipment[1],
                pickupTime  : shipment[2].toNumber(),
                deliveryTime: shipment[3].toNumber(),
                distance    : shipment[4].toNumber(),
                price       : ethers.utils.formatEther(shipment[5].toString()),
                status      : shipment[6],
                isPaid      : shipment[7]
            }

            return singleShiplent;

        } catch (error) {
            console.error("Sorry no Shipment");
        }

    };

    const startShipment = async getProduct => {
        const {receiver, index} = getProduct;

        try {
            
            if(!window.ethereum) return "install MetaMask";

            const accounts       = await window.ethereum.request({ method: "eth_accounts", });
            const web3Modal      = new Web3Modal();
            const connection     = await web3Modal.connect();
            const provider       = new ethers.providers.Web3Provider(connection);
            const signer         = provider.getSigner();
            const contract       = fetchContract(signer);
            const shipment       = await contract.startShipment(
                                                                accounts[0],
                                                                receiver,
                                                                index * 1,
                                                            );

            shipment.wait();
            console.log("start Shipment: ", shipment);

        } catch (error) {
            console.error("Sorry no Shipment for start", error);
        }

    };

    // CHEACK WALLET CONNECTION 
    const checkIfWalletConnected = async () => {

        try {
            
            if(!window.ethereum) return "install MetaMask";
            const accounts       = await window.ethereum.request({ method: "eth_accounts", });
            if(accounts.length){
                setCurrentUser(accounts[0]);
            } else {
                return "No account";
            }

        } catch (error) {
            return "Not Connected";
        }

    };

    // CONNECT WALLET FUNCTION 
    const connectWallet = async () => {
        try {
            
            if(!window.ethereum) return "install MetaMask";
            const accounts       = await window.ethereum.request({ method: "eth_accounts", });
            setCurrentUser(accounts[0]);

        } catch (error) {
            return "Connecting has an error "
        }
    };

    useEffect(() => {
        checkIfWalletConnected();
    } , []);

        return (
            <TrackingContext.Provider 
                value={{
                    connectWallet,
                    createShipment,
                    getAllShipment,
                    compeletShipment,
                    getShipment,
                    startShipment,
                    getShipmentCount,
                    DappName,
                    currentUser
                }} 
            >
                
                    {childeren}
                
            </TrackingContext.Provider>
        );

};

export const useThemeContext = () => useContext(TrackingContext);