"use client"
//@ts-nocheck

import React, { useEffect, useState } from 'react'

import { useContract } from '../../context/ContractsContext';
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const Admin = () => {

    const { provider, signer, contractContractor, contractDealer, account, contractVerifiedContractor } = useContract();
    const [contractorCount, setContractorCount] = useState(0);
    const [contractors, setContractors] = useState([])

    const [data, setData] = useState({
        financialcapabilities: 0,
        Techcapabilities: 0,
        Experience: 0,
        Performance: 0,
        HealthandSafety: 0
    })

    useEffect(() => {
        const fetchData = async () => {

            try {
                if (contractContractor) {
                    const count = await contractContractor.getContractorLength();
                    setContractorCount(count.toNumber());

                    const promises = []
                    for (let i = 0; i < count; i++) {
                        promises.push(contractContractor.getContractors(i))
                    }

                    const result = await Promise.all(promises);
                    //@ts-ignore
                    setContractors(result)
                    // console.log(result[2])
                    console.log(result[1].name)
                    console.log(result[1].resume)
                    console.log(result[1].contractorAddress)
                } else {
                    throw new Error("Contract instance not found.");
                }
            } catch (error) {

            } finally {

            }
        };

        fetchData();

        return () => {
        };
    }, [contractContractor]);

    const handleOnChange = (e: any) => {
        const { name, value } = e.target

        setData((prevData) => {
            return {
                ...prevData,
                [name]: value
            }
        })

    }

    const handleSubmit = async (id: any) => {
        try {
            const payLoad = {
                financialcapabilities: Number(data.financialcapabilities),
                Techcapabilities: Number(data.Techcapabilities),
                Experience: Number(data.Experience),
                Performance: Number(data.Performance),
                HealthandSafety: Number(data.HealthandSafety)
            }
            //@ts-ignore
            const tx = await contractVerifiedContractor.updateContract(id, payLoad.financialcapabilities, payLoad.Techcapabilities, payLoad.Experience, payLoad.Performance, payLoad.HealthandSafety)

            await tx.wait();
            console.log('Contractor Updated Successfully')
            setData({
                financialcapabilities: 0,
                Techcapabilities: 0,
                Experience: 0,
                Performance: 0,
                HealthandSafety: 0
            })
        } catch (error) {

        }
    }



    return (
        <div className='flex justify-around flex-wrap bg-black-100'>
            {contractors.map((card: any, index) => (
                <CardContainer key={index} className="inter-var">
                    <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black-100 dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border overflow-hidden">
                        <CardItem
                            translateZ="50"
                            className="text-xl font-bold text-neutral-600 dark:text-white"
                        >
                            Project Name: {card.name}
                        </CardItem>
                        <CardItem
                            as="p"
                            translateZ="60"
                            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                        >
                            {card.contractorAddress}
                        </CardItem>
                        <Drawer>
                            <DrawerTrigger>
                                <div className="flex justify-center items-center mt-20">
                                    <CardItem
                                        translateZ={20}
                                        as={'p'}
                                        target="__blank"
                                        className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white cursor-pointer"

                                    >
                                        Try now →
                                    </CardItem>
                                </div>
                            </DrawerTrigger>
                            <DrawerContent>
                                <DrawerHeader>
                                    <DrawerTitle>
                                        <div className='w-full flex justify-center'>
                                            <p className='font-poppins uppercase tracking-widest text-xs text-center text-blue-100 max-w-96'>ENTER RATINGS TO ADD</p>
                                        </div>
                                    </DrawerTitle>
                                </DrawerHeader>
                                <div className='mt-5 flex flex-col items-center font-poppins' id='form-container'>
                                    <div className="my-8" >
                                        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                                            <div className=''>
                                                <Label htmlFor="financialcapabilities">Financial Capabilities</Label>
                                                <Input id="financialcapabilities" name='financialcapabilities' placeholder="1-10" type="number" className='bg-black-100 text-white font-poppins' value={data.financialcapabilities} onChange={handleOnChange} />
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <Label htmlFor="Techcapabilities">Tech Capabilities</Label>
                                            <Input id="Techcapabilities" name='Techcapabilities' placeholder="1-10" type="number" className='bg-black-100 text-white font-poppins' value={data.Techcapabilities} onChange={handleOnChange} />
                                        </div>
                                        <div className="mb-4">
                                            <Label htmlFor="Experience">Experience</Label>
                                            <Input id="Experience" name='Experience' placeholder="1-10" type="number" className='bg-black-100 text-white font-poppins' value={data.Experience} onChange={handleOnChange} />
                                        </div>
                                        <div className="">
                                            <Label htmlFor="Performance">Performance</Label>
                                            <Input
                                                id="Performance"
                                                placeholder="1-10"
                                                name='Performance'
                                                type="number" className='bg-black-100 text-white font-poppins'
                                                onChange={handleOnChange}
                                                value={data.Performance}
                                            />
                                        </div>
                                        <div className="">
                                            <Label htmlFor="HealthandSafety">Health and Safety</Label>
                                            <Input
                                                id="HealthandSafety"
                                                placeholder="1-10"
                                                name='HealthandSafety'
                                                type="number" className='bg-black-100 text-white font-poppins'
                                                onChange={handleOnChange}
                                                value={data.HealthandSafety}
                                            />
                                        </div>

                                        <button
                                            className="bg-gradient-to-br mt-4 relative group/btn from-zinc-900 to-zinc-900  block bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] font-poppins"
                                            type="submit"
                                            //@ts-ignore
                                            onClick={() => {
                                                handleSubmit(index)
                                            }}
                                        >
                                            Add Contractor &rarr;
                                        </button>

                                    </div>
                                </div>
                                <DrawerFooter>
                                    <DrawerClose>
                                        <button>
                                            <span className='font-poppins inline-flex h-[2.5rem] animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none hover:scale-110'>Cancel</span>
                                        </button>
                                    </DrawerClose>
                                </DrawerFooter>
                            </DrawerContent>
                        </Drawer>

                    </CardBody>
                </CardContainer>
            ))}
        </div>
    )
}

export default Admin