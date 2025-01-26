"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import React from "react";
import { ethers } from 'ethers';
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { useContract } from "../context/ContractsContext"; // Adjust the path as needed

interface Props {
    projectname: string;
    description: string;
    dealId: number;
    onClose: () => void;
}

export function GlareCardDemo({ projectname, description, dealId, onClose }: Props) {
    const { contractDeal, contractRequest, signer, provider } = useContract();

    const [data, setData] = useState({
        charges: '',
        completionDateTime: ''  // Add this field to hold the date-time value
    });

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleOnSubmit = async () => {
        try {
            // Convert completionDateTime to a timestamp
            const timestamp = new Date(data.completionDateTime).getTime() / 1000; // Convert to seconds
    
            // Convert charges to BigNumber (assuming it's in ETH and needs conversion to Wei)
            const chargesInWei = ethers.utils.parseEther(data.charges);
    
            // Call the contract function
            // @ts-ignore
            await contractRequest.addInterest(dealId, chargesInWei, timestamp);
            
            console.log({
                charges: data.charges,
                timestamp,
                dealId // Log the dealId
            }, "Submitted");
    
            onClose();
            setData({
                charges: '',
                completionDateTime: ''  // Reset the date-time field
            });
        } catch (error) {
            console.error("Error submitting interest:", error);
        }
    };

    return (
        <CardContainer className="inter-var">
            <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
                <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-neutral-600 dark:text-white"
                >
                    Project Name: {projectname}
                </CardItem>
                <CardItem
                    as="p"
                    translateZ="60"
                    className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                >
                    {description}
                </CardItem>
                <CardItem translateZ="100" className="w-full mt-4">
                    <div className="flex flex-col items-center z-[100] mt-5 relative">
                        <LabelInputContainer>
                            <Input
                                className="z-[100] cursor-pointer"
                                id="charges"
                                placeholder="$600"
                                type="number"
                                value={data.charges}
                                name="charges"
                                onChange={handleOnChange}
                            />
                        </LabelInputContainer>
                        <LabelInputContainer>
                            <Input
                                className="z-[100] cursor-pointer"
                                id="completionDateTime"
                                placeholder="Select Date and Time"
                                type="datetime-local"
                                value={data.completionDateTime}
                                name="completionDateTime"
                                onChange={handleOnChange}
                            />
                        </LabelInputContainer>
                    </div>
                </CardItem>
                <div className="flex justify-between items-center mt-20">
                    <CardItem
                        translateZ={20}
                        as={'p'}
                        target="__blank"
                        className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white cursor-pointer"
                        onClick={handleOnSubmit}
                    >
                        Submit
                    </CardItem>
                    <CardItem
                        translateZ={20}
                        as={'p'}
                        target="__blank"
                        className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white cursor-pointer"
                        onClick={onClose}
                    >
                        Close
                    </CardItem>
                </div>
            </CardBody>
        </CardContainer>
    );
}

//@ts-ignore
const LabelInputContainer = ({ children }) => (
    <div className="relative w-full z-[100]">
        {children}
    </div>
);
