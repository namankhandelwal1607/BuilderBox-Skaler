"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ethers } from 'ethers';
import ContractorABI from '../contracts/Contractor.json'; 
import VerifiedContractorABI from '../contracts/VerifiedContractor.json';
import DealerABI from '../contracts/Dealer.json'; 
import DealABI from '../contracts/Deal.json';
import RequestABI from '../contracts/Request.json'; 
import SequenceABI from '../contracts/Sequence.json';
import DealNFTABI from '../contracts/DealNFT.json'; 
import DealFinalABI from '../contracts/DealFinal.json';

interface ContractState {
  provider: ethers.providers.Web3Provider | null;
  signer: ethers.Signer | null;
  contractContractor: ethers.Contract | null;
  contractVerifiedContractor: ethers.Contract | null;
  contractDealer: ethers.Contract | null;
  contractDeal: ethers.Contract | null;
  contractRequest: ethers.Contract | null;
  contractSequence: ethers.Contract | null;
  contractDealNFT: ethers.Contract | null;
  contractDealFinal: ethers.Contract | null;
  account: string;
}

const defaultState: ContractState = {
  provider: null,
  signer: null,
  contractContractor: null,
  contractVerifiedContractor: null,
  contractDealer: null,
  contractDeal: null,
  contractRequest: null,
  contractSequence: null,
  contractDealNFT: null,
  contractDealFinal: null,
  account: 'None',
};

const ContractContext = createContext<ContractState | undefined>(undefined);

interface ContractProviderProps {
  children: ReactNode;
}

export const ContractProvider: React.FC<ContractProviderProps> = ({ children }) => {
  const [state, setState] = useState<ContractState>(defaultState);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    const connectWallet = async () => {
      try {
        const { ethereum } = window as any;

        if (ethereum) {
          if (!isConnecting) {
            setIsConnecting(true);

            const provider = new ethers.providers.Web3Provider(ethereum);
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            const signer = provider.getSigner();
            const contractorAddress="0x92645cA4ab91455E1805d06a2883486a1b18aD5E";
            const contractorABI= ContractorABI.abi;

            const verifiedContractorAddress="0x92645cA4ab91455E1805d06a2883486a1b18aD5E";
            const verifiedContractorABI= VerifiedContractorABI.abi;

            const dealerAddress="0xac6729d30C9F4aD0945b89917f8d84Ae384E3d1D";
            const dealerABI= DealerABI.abi;

            const dealAddress="0xdC6F46D370D0B40D619CbB02F87532ED11297E2C";
            const dealABI= DealABI.abi;

            const requestAddress="0xf8700E3B3295cD56d9ca3ce138Cf71c14542a43E";
            const requestABI= RequestABI.abi;

            const sequenceAddress="0xacB61cDB5C61dB8c3ad96b20D7ddd2917320ae49";
            const sequenceABI= SequenceABI.abi;

            const dealNFTAddress="0xD856e738ec91173160da79d1688032e9a76c4FAb";
            const dealNFTABI= DealNFTABI.abi;

            const dealFinalAddress="0x35B704eaD9b7c9096B792bb742Aef362fFC3E586";
            const dealFinalABI= DealFinalABI.abi;

            const contractContractor = new ethers.Contract(contractorAddress, contractorABI, signer);
            const contractVerifiedContractor = new ethers.Contract(verifiedContractorAddress, verifiedContractorABI, signer);
            const contractDealer = new ethers.Contract(dealerAddress, dealerABI, signer);
            const contractDeal = new ethers.Contract(dealAddress, dealABI, signer);
            const contractRequest = new ethers.Contract(requestAddress, requestABI, signer);
            const contractSequence = new ethers.Contract(sequenceAddress, sequenceABI, signer);
            const contractDealNFT = new ethers.Contract(dealNFTAddress, dealNFTABI, signer);
            const contractDealFinal = new ethers.Contract(dealFinalAddress, dealFinalABI, signer);


            setState({
              provider,
              signer,
              contractContractor,
              contractVerifiedContractor,
              contractDealer,
              contractDeal,
              contractRequest,
              contractSequence,
              contractDealNFT,
              contractDealFinal,
              account: accounts,
            });

            ethereum.on('chainChanged', () => window.location.reload());
            ethereum.on('accountsChanged', () => window.location.reload());
          }
        } else {
          alert('Please install MetaMask');
        }
      } catch (error: any) {
        if (error.code === -32002) {
          console.log('MetaMask is already processing a request. Please wait.');
        } else {
          console.error(error);
        }
      } finally {
        setIsConnecting(false);
      }
    };

    connectWallet();
  }, [isConnecting]);

  return (
    <ContractContext.Provider value={state}>
      {children}
    </ContractContext.Provider>
  );
};

export const useContract = (): ContractState => {
  const context = useContext(ContractContext);
  if (context === undefined) {
    throw new Error('useContract must be used within a ContractProvider');
  }
  return context;
};
