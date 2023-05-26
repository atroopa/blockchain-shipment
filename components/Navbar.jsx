import {useEffect, useState, useContext} from 'react';
import {ThemeContext} from "@/context/Tracking";
import { Nav1, Nav2, Nav3 } from '@/components';


const Navbar = () => {

  const [state, setState] = useState(false);
  const {currentUser , connectWallet} = useContext(ThemeContext);

  const navigation = [
    {title: "Home"      , path: "#"},
    {title: "Services"  , path: "#"},
    {title: "Contact Us", path: "#"},
    {title: "Erc20"     , path: "#"}
  
  ]
  return (
    <div>
      Navbar
    </div>
  );
};

export default Navbar;