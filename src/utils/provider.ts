import { AlchemyProvider, InfuraProvider } from '@ethersproject/providers';

import config from '@/config';

let provider: BaseProvider;

// Now ethers.js v5.2.0 doesn't support matic network for InfuraProvider
const matic: Network = {
    name: 'matic',
    chainId: 137,
    _defaultProvider: (providers) => new providers.JsonRpcProvider(`https://polygon-mainnet.infura.io/v3/${config.infuraKey}`),
};

const mumbai: Network = {
    name: 'mumbai',
    chainId: 80001,
    _defaultProvider: (providers) => new providers.JsonRpcProvider(`https://polygon-mumbai.infura.io/v3/${config.infuraKey}`),
};


if (config.chainId == 80001) {
    provider = getDefaultProvider(mumbai);
} else if (config.chainId == 137) {
    provider = getDefaultProvider(matic);
} else {
    provider = new InfuraProvider({name: config.network, chainId: config.chainId}, config.infuraKey);
}

export default provider;

const debugProvider = new AlchemyProvider(config.network, config.alchemyKey);

export { debugProvider };
