import {useEffect, useState, useContext} from 'react';
import {ThemeContext} from "@/context/Tracking";
import { Nav1, Nav2, Nav3 } from '@/components';

const Navbar = () => {

  const [state, setState] = useState(false);

  return (
    <div>Navbar</div>
  );
};

export default Navbar;