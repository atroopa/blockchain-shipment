
import { createContext, useContext, useState , useEffect} from "react";
import Web3Modal from 'web3modal';
import {ethers}  from 'ethers';
import * as Blockchain from '../utils/config';
import { useRainbowKit } from '@rainbow-me/rainbowkit';


// FETCHING SMART CONTRACT 
const fetchContract = signerOrProvider => {
   return new ethers.Contract(Blockchain.contractAddress, Blockchain.contractAbi, signerOrProvider);
}

export const ThemeContext = createContext({});

export const TrackingProvider = ({ children }) => {
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
                    new Date(pickupTime).getTime(),
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


        const getAllShipment = async () => {
            try {
                
                const provider     = new ethers.providers.JsonRpcProvider(Blockchain.API_URL)
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
                console.error("from getAllShipment func : error want, getting shipment");
            }
        };
    

        const getShipmentCount =  async () => {

            try {
                
                if (!window.ethereum) return "Install MetaMask";
    
                const accounts      = await window.ethereum.request({ method: "eth_accounts", });
                const provider      = new ethers.providers.JsonRpcProvider(Blockchain.API_URL);
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
                const provider       = new ethers.providers.JsonRpcProvider(Blockchain.API_URL);
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
            if (!window.ethereum) return "Install MetaMask";
            window.localStorage.clear();
            const isConnected = !!window.ethereum.selectedAddress;
            if (isConnected) {
                setCurrentUser(window.ethereum.selectedAddress);
                setWalletConnected(true); // تنظیم وضعیت walletConnected به true
                console.log("Connected");
            } else {
                console.log("No account");
            }
    
        } catch (error) {
            return "Not Connected";
        }
    };
    


    const connectWallet = async () => {
        try {
            if (!window.ethereum) return "Install MetaMask";
    
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            setCurrentUser(accounts[0]);
            setWalletConnected(true); // تنظیم وضعیت walletConnected به true
    
        } catch (error) {
            return "Connecting has an error";
        }
    };

    
  
    const handleConnect = async () => {
        const { getSigner, clearWalletCache } = useRainbowKit();
        try {
        clearWalletCache();
        const signer = await getSigner();
        const accounts = await signer.getAddress();
  
        setCurrentUser(accounts[0]);
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
        //checkIfWalletConnected();
    }, []);

    return (
        <ThemeContext.Provider value={{ 
            createShipment ,
            getAllShipment,
            getShipmentCount,
            compeletShipment,
            getShipment,
            startShipment,
            checkIfWalletConnected,
            connectWallet,
            DappName,
            currentUser,
            handleConnect
            
            }}>
            {children}
        </ThemeContext.Provider>
    )
};

export const useThemeContext = () => useContext(ThemeContext);