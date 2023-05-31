import '@/styles/globals.css';
import { Navbar, Footer } from '@/components';
import { TrackingProvider } from '../context/Tracking';
import '@rainbow-me/rainbowkit/styles.css';

import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit';
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
  metaMaskWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, goerli } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

import merge from 'lodash.merge';
import { Theme } from '@rainbow-me/rainbowkit';

const myCustomTheme = {
  blurs: {
    modalOverlay: '',
  },
  colors: {
    accentColor: '#07296d',
    accentColorForeground: '#ffffff',
    actionButtonBorder: '',
    actionButtonBorderMobile: '',
    actionButtonSecondaryBackground: '',
    closeButton: '',
    closeButtonBackground: '',
    connectButtonBackground: '#808080',
    connectButtonBackgroundError: '',
    connectButtonInnerBackground: '',
    connectButtonText: '#ffffff',
    connectButtonTextError: '',
    connectionIndicator: '',
    downloadBottomCardBackground: '',
    downloadTopCardBackground: '',
    error: '',
    generalBorder: '',
    generalBorderDim: '',
    menuItemBackground: '',
    modalBackdrop: '',
    modalBackground: '',
    modalBorder: '',
    modalText: '',
    modalTextDim: '',
    modalTextSecondary: '',
    profileAction: '',
    profileActionHover: '',
    profileForeground: '',
    selectedOptionBorder: '',
    standby: '',
  },
  fonts: {
    body: '',
  },
  radii: {
    actionButton: '10px',
    connectButton: '',
    menuButton: '',
    modal: '',
    modalMobile: '',
  },
  shadows: {
    connectButton: '',
    dialog: '',
    profileDetailsAction: '',
    selectedOption: '',
    selectedWallet: '',
    walletLogo: '',
  },
};


const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    ...("https://eth-goerli.g.alchemy.com/v2/P2QssdOySjfKTIx6CCBYE2C1LX93pr17" === 'true' ? [goerli] : []),
  ],
  [publicProvider()]
);

const projectId = 'YucyTMAeXVJx8HMfOmpVdWbBkXLJIyEg';

const { wallets } = getDefaultWallets({
  appName: 'RainbowKit demo',
  projectId,
  chains,
});

const demoAppInfo = {
  appName: 'Rainbowkit Demo',
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [
      metaMaskWallet({projectId, chains}),
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: false,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider appInfo={demoAppInfo} theme={myCustomTheme} chains={chains}>
         <TrackingProvider> 
           <Navbar/> 
          <Component {...pageProps} />
         </TrackingProvider> 
        <Footer />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
