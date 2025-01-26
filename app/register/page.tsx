"use client";
// import React, { useEffect, useState } from "react";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { cn } from "@/lib/utils";
// import { useRouter } from 'next/navigation';
// import { FaLocationArrow } from "react-icons/fa6";
// import { Spotlight } from "@/components/ui/Spotlight";
// import { gsap } from 'gsap';
// import { useGSAP } from '@gsap/react';
// import { useContract } from '../../context/ContractsContext'; // Adjust the path as needed

// const Page = () => {
//     const router = useRouter();
//     const { provider, signer, contractContractor, account } = useContract();
//     const [data, setData] = useState({
//         firstname: '',
//         lastname: '',
//         wallet_address: '',
//         work_link: ''
//     });
//     const [loading, setLoading] = useState(true);

//     useGSAP(() => {
//         gsap.from('#form-inp', {
//             y: 600,
//             duration: 2
//         });
//     }, []);

//     useEffect(() => {
//         const getWalletStatus = async () => {
//             if (typeof window.ethereum !== 'undefined' && window.ethereum.request) {
//                 try {
//                     const accounts = await window.ethereum.request({ method: 'eth_accounts' });
//                     if (accounts && accounts.length > 0) {
//                         setData((prevData) => ({
//                             ...prevData,
//                             wallet_address: accounts[0]
//                         }));
//                     } else {
//                         console.error('No accounts found.');
//                     }
//                 } catch (error) {
//                     console.error('Error fetching accounts:', error);
//                 }
//             } else {
//                 console.error('Ethereum provider not found.');
//             }
//             setLoading(false);
//         };

//         getWalletStatus();
//     }, [account]);

//     const handleOnChange = (e: any) => {
//         const { name, value } = e.target;

//         setData((prevData) => ({
//             ...prevData,
//             [name]: value
//         }));
//     };

//     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         console.log(contractContractor);
//         console.log("Form submitted", data);
//         contractContractor.addContractor(data.firstname+data.lastname, data.work_link);
//         router.push('/');
//     };

//     return (
//         <div className="relative overflow-hidden h-[100vh]">
//             <div className="mt-20">
//                 <div className="overflow-x-hidden">
//                     <Spotlight
//                         className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
//                         fill="white"
//                     />
//                     <Spotlight
//                         className="h-[80vh] w-[50vw] top-10 left-full"
//                         fill="purple"
//                     />
//                     <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />
//                 </div>

//                 <div
//                     className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black-100/[0.2]
//                     absolute top-0 left-0 flex items-center justify-center"
//                 >
//                     <div
//                         className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100
//                         bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
//                     />
//                 </div>

//                 <div className="flex justify-center relative -mt-16 z-10" id="form-inp">
//                     <div className="flex items-center justify-center flex-col pt-16">
//                         <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black-100">
//                             <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
//                                 Welcome to BuilderBox
//                             </h2>
//                             <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
//                                 Register yourself at builderbox. We will inform once done
//                             </p>

//                             <form className="my-8" onSubmit={handleSubmit}>
//                                 <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
//                                     <LabelInputContainer>
//                                         <Label htmlFor="firstname">First name</Label>
//                                         <Input id="firstname" placeholder="Tyler" type="text" name="firstname" value={data.firstname} onChange={handleOnChange} />
//                                     </LabelInputContainer>
//                                     <LabelInputContainer>
//                                         <Label htmlFor="lastname">Last name</Label>
//                                         <Input id="lastname" placeholder="Durden" type="text" name="lastname" value={data.lastname} onChange={handleOnChange} />
//                                     </LabelInputContainer>
//                                 </div>
//                                 <LabelInputContainer className="mb-4">
//                                     <Label htmlFor="wallet_address">Wallet Address</Label>
//                                     <Input id="wallet_address" placeholder="0x58e1889DDEB699A493E15782f30D93Acf8BAEe93" type="text" name="wallet_address" value={data.wallet_address} onChange={handleOnChange} disabled />
//                                 </LabelInputContainer>
//                                 <LabelInputContainer className="mb-4">
//                                     <Label htmlFor="work_link">Work Link</Label>
//                                     <Input id="work_link" placeholder="Link" type="text" name="work_link" value={data.work_link} onChange={handleOnChange} />
//                                 </LabelInputContainer>

//                                 <button
//                                     className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
//                                     type="submit"
//                                 >
//                                     Register &rarr;
//                                     <BottomGradient />
//                                 </button>

//                                 <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

//                                 <button
//                                     className="mt-2 bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
//                                     onClick={() => router.push('/')}
//                                 >
//                                     Cancel &rarr;
//                                     <BottomGradient />
//                                 </button>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// const BottomGradient = () => {
//     return (
//         <>
//             <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
//             <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
//         </>
//     );
// };

// const LabelInputContainer = ({
//     children,
//     className,
// }: {
//     children: React.ReactNode;
//     className?: string;
// }) => {
//     return (
//         <div className={cn("flex flex-col space-y-2 w-full", className)}>
//             {children}
//         </div>
//     );
// };

// export default Page;





import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useRouter } from 'next/navigation';
import { FaLocationArrow } from "react-icons/fa6";
import { Spotlight } from "@/components/ui/Spotlight";
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useContract } from '../../context/ContractsContext'; // Adjust the path as needed

const Page = () => {
    const router = useRouter();
    const { provider, signer, contractContractor, contractDealer, account } = useContract();
    const [data, setData] = useState({
        firstname: '',
        lastname: '',
        wallet_address: '',
        work_link: '',
        registration_type: 'contractor' // Default to contractor
    });
    const [loading, setLoading] = useState(true);

    useGSAP(() => {
        gsap.from('#form-inp', {
            y: 600,
            duration: 2
        });
    }, []);

    useEffect(() => {
        const getWalletStatus = async () => {
            if (typeof window.ethereum !== 'undefined' && window.ethereum.request) {
                try {
                    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                    if (accounts && accounts.length > 0) {
                        setData((prevData) => ({
                            ...prevData,
                            wallet_address: accounts[0]
                        }));
                    } else {
                        console.error('No accounts found.');
                    }
                } catch (error) {
                    console.error('Error fetching accounts:', error);
                }
            } else {
                console.error('Ethereum provider not found.');
            }
            setLoading(false);
        };

        getWalletStatus();
    }, [account]);

    const handleOnChange = (e: any) => {
        const { name, value } = e.target;

        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(data.registration_type);
        console.log("Form submitted", data);
        if (data.registration_type === 'contractor') {
            // @ts-ignore
            contractContractor.addContractor(data.firstname + data.lastname, data.work_link);
        } else {
            // @ts-ignore
            contractDealer.addDealer(data.firstname + data.lastname);
        }
        router.push('/');
    };

    return (
        <div className="relative overflow-hidden h-[100vh]">
            <div className="mt-20">
                <div className="overflow-x-hidden">
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

                <div
                    className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black-100/[0.2]
                    absolute top-0 left-0 flex items-center justify-center"
                >
                    <div
                        className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100
                        bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
                    />
                </div>

                <div className="flex justify-center relative -mt-16 z-10" id="form-inp">
                    <div className="flex items-center justify-center flex-col pt-16">
                        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black-100">
                            <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                                Welcome to BuilderBox
                            </h2>
                            <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                                Register yourself at builderbox. We will inform once done
                            </p>

                            <form className="my-8" onSubmit={handleSubmit}>
                                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                                    <LabelInputContainer>
                                        <Label htmlFor="firstname">First name</Label>
                                        <Input id="firstname" placeholder="Tyler" type="text" name="firstname" value={data.firstname} onChange={handleOnChange} />
                                    </LabelInputContainer>
                                    <LabelInputContainer>
                                        <Label htmlFor="lastname">Last name</Label>
                                        <Input id="lastname" placeholder="Durden" type="text" name="lastname" value={data.lastname} onChange={handleOnChange} />
                                    </LabelInputContainer>
                                </div>
                                <LabelInputContainer className="mb-4">
                                    <Label htmlFor="wallet_address">Wallet Address</Label>
                                    <Input id="wallet_address" placeholder="0x58e1889DDEB699A493E15782f30D93Acf8BAEe93" type="text" name="wallet_address" value={data.wallet_address} onChange={handleOnChange} disabled />
                                </LabelInputContainer>
                                <LabelInputContainer className="mb-4">
                                    <Label htmlFor="registration_type">Registration Type</Label>
                                    <select className="bg-black-100" id="registration_type" name="registration_type" value={data.registration_type} onChange={handleOnChange}>
                                        <option value="contractor">Contractor</option>
                                        <option value="dealer">Dealer</option>
                                    </select>
                                </LabelInputContainer>
                                <LabelInputContainer className="mb-4">
                                    <Label htmlFor="work_link">Work Link</Label>
                                    <Input id="work_link" placeholder="Link" type="text" name="work_link" value={data.work_link} onChange={handleOnChange} disabled={data.registration_type === 'dealer'} />
                                </LabelInputContainer>

                                <button
                                    className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                                    type="submit"
                                >
                                    Register &rarr;
                                    <BottomGradient />
                                </button>

                                <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

                                <button
                                    className="mt-2 bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                                    onClick={() => router.push('/')}
                                >
                                    Cancel &rarr;
                                    <BottomGradient />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};

export default Page;
