import { FaLocationArrow } from "react-icons/fa6";

import MagicButton from "./MagicButton";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";
import { ethers } from 'ethers';
import { useEffect, useState } from "react";
import { useContract } from '../context/ContractsContext';


declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request?: (...args: any[]) => Promise<any>;
      on?: (eventName: string, callback: (...args: any[]) => void) => void;
    };
  }
}

const Hero = () => {
  const { provider, signer, contractContractor, contractDealer, contractVerifiedContractor, contractDealFinal, contractDeal } = useContract();
  const [account, setAccount] = useState<string | null>(null);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        //@ts-ignore
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);

        //@ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const message = 'Sign this message to connect to Sepolia testnet';
        const signature = await signer.signMessage(message);

        console.log('Message:', message);
        console.log('Signature:', signature);
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      }
    } else {
      console.error('MetaMask is not installed');
    }
  };

  // useEffect(() => {


  //   const finalizeDeal = async () => {
  //     try {
  //       //@ts-ignore
  //       const dealCount = await contractDeal.dealCount();
  //       console.log(dealCount.toNumber())
  //       const overdue: number[] = [];

  //       for (let i = 0; i < dealCount; i++) {
  //         //@ts-ignore
  //         const { dealClosingTime } = await contractDeal.getDealDetails(i);
  //         const time = dealClosingTime.toNumber();
  //         // console.log(time)
  //         // const dealData = await contractDeal.getDealDetails(i);
  //         if (time < Math.floor(Date.now() / 1000)) {
  //           overdue.push(i);
  //         }

  //         // console.log('Overdue deals:', dealData);

  //         for (let i = 0; i < overdue.length; i++) {
  //           //@ts-ignore
  //           const tx = await contractDealFinal.doingDeal(i);
  //           await tx.wait();
  //         }
  //       }

  //       console.log('Overdue deals:', overdue);


  //     } catch (error) {
  //       console.error('Error finalizing deals:', error);
  //     }
  //   };

  //   finalizeDeal();
  // }, [contractDeal]);


  return (
    <div className="pb-20 pt-36">
      {/**
       *  UI: Spotlights
       *  Link: https://ui.aceternity.com/components/spotlight
       */}
      <div>
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
        />
        <Spotlight
          className="h-[80vh] w-[50vw] top-10 left-full"
          fill="purple"
        />
        <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />
      </div>

      {/**
       *  UI: grid
       *  change bg color to bg-black-100 and reduce grid color from
       *  0.2 to 0.03
       */}
      <div
        className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black-100/[0.2]
       absolute top-0 left-0 flex items-center justify-center"
      >
        {/* Radial gradient for the container to give a faded look */}
        <div
          // chnage the bg to bg-black-100, so it matches the bg color and will blend in
          className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100
         bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        />
      </div>

      <div className="flex justify-center relative my-20 z-10">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
          <p className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80">
            Dynamic Web3 Magic with BuilderBox
          </p>

          <TextGenerateEffect
            words="Transforming Contracts into Seamless User Experiences"
            className="text-center text-[40px] md:text-5xl lg:text-6xl"
          />

          <p className="text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl">
            Hi! we are BuilderBox, a web3 Developer Team .
          </p>

          <a onClick={connectWallet}>
            <MagicButton
              title="Connect Wallet"
              icon={<FaLocationArrow />}
              position="right"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
