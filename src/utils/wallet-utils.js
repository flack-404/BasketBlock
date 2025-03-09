import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig } from 'wagmi';
import { avalancheFuji, baseSepolia, polygon } from 'wagmi/chains';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { publicProvider } from 'wagmi/providers/public';

const electroneumTestnet = {
  id: 5201420,
  name: "Electroneum Testnet",
  iconUrl: "https://cryptologos.cc/logos/electroneum-etn-logo.png",
  iconBackground: "#fff",
  nativeCurrency: { name: "Electroneum", symbol: "ETN", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.ankr.com/electroneum_testnet"] },
  },
  blockExplorers: {
    default: { name: "Electroneum Explorer", url: "https://blockexplorer.thesecurityteam.rocks/" },
  },
};


const opBNBTestnet = {
  id: 5611,
  name: 'opBNB Testnet',
  network: 'opBNBTestnet',
  nativeCurrency: {
    decimals: 18,
    name: 'tBNB',
    symbol: 'tBNB',
  },
  rpcUrls: {
    public: { http: ['https://opbnb-testnet-rpc.bnbchain.org'] },
    default: { http: ['https://opbnb-testnet-rpc.bnbchain.org'] },
  },
  iconUrl: 'https://chainspot.io/api/1.0/image/view?path=497/927/op_bnb1687420235160.png',
  icon: {
    url: 'https://chainspot.io/api/1.0/image/view?path=497/927/op_bnb1687420235160.png',
    width: 512,
    height: 512,
    format: 'png'
  },
  blockExplorers: {
    default: { url: 'https://testnet.opbnbscan.com' }
  }
};

const unichainSepolia = {
  id: 1301,
  name: 'Unichain Sepolia Testnet',
  network: 'unichainSepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: { http: ['https://sepolia.unichain.org'] },
    default: { http: ['https://sepolia.unichain.org'] },
  },
  iconUrl: 'https://img.cryptorank.io/coins/unichain1728632895218.png',
  icon: {
    url: 'https://img.cryptorank.io/coins/unichain1728632895218.png',
    width: 512,
    height: 512,
    format: 'png'
  },
  blockExplorers: {
    default: { url: 'https://sepolia.uniscan.xyz' }
  }
};

// Configure chains and providers
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [electroneumTestnet, avalancheFuji , opBNBTestnet, polygon, baseSepolia, unichainSepolia],
  [
    jsonRpcProvider({
      rpc: (chain) => {
        switch (chain.id) {
          case electroneumTestnet.id:
            return { http: 'https://rpc.ankr.com/electroneum_testnet' };
          case avalancheFuji.id:
            return { http: 'https://api.avax-test.network/ext/bc/C/rpc' };
          
          case opBNBTestnet.id:
            return { http: 'https://opbnb-testnet-rpc.bnbchain.org' };
          case polygon.id:
            return { http: 'https://polygon-mainnet.infura.io' };
          case baseSepolia.id:
            return { http: 'https://rpc.base-sepolia.org' };
          case unichainSepolia.id:
            return { http: 'https://sepolia.unichain.org' };
          default:
            return null;
        }
      },
    }),
  ]
);

// Configure wallet connectors
const { connectors } = getDefaultWallets({
  appName: 'BasketBlock',
  projectId: '473b14b1b2d4de440af5101e080643aa',
  chains,
});

// Create Wagmi configuration
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export { chains, wagmiConfig };
