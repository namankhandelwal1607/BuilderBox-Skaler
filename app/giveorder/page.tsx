"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { ethers } from "ethers"; // Import ethers
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import { MdHealthAndSafety } from "react-icons/md";
import { Spotlight } from "@/components/ui/Spotlight";
import { useContract } from "../../context/ContractsContext"; // Adjust the path as needed
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Page = () => { // Changed from 'page' to 'Page' for convention
  const { provider, signer, contractContractor, contractDealer, contractDeal, account } =useContract();

  const [data, setData] = useState({
    ProjectName: "",
    Budget: "",
    FinancialCapabilities: "",
    TechCapabilities: "",
    Experience: "",
    Performance: "",
    HealthandSafty: "",
    ClosingTime: new Date(),
  });

  const handleSmartContract = async () => {
    try {
      // Convert closing time to Unix timestamp in seconds
      const closingTime = new Date(data.ClosingTime).getTime() / 1000;

      // Validate and convert budget from Ether to Wei
      if (!data.Budget || isNaN(parseFloat(data.Budget))) {
        throw new Error("Invalid budget value");
      }
      const budgetInWei = ethers.utils.parseEther(data.Budget);

      // Call the smart contract function with the budget sent as ETH
      // @ts-ignore
      const tx = await contractDeal.addDetails(
        data.ProjectName, // _dealName (string)
        parseFloat(data.FinancialCapabilities), // _needFinancialCapabilities (uint256)
        parseFloat(data.TechCapabilities), // _needTechCapabilities (uint256)
        parseFloat(data.Experience), // _needExperience (uint256)
        parseFloat(data.Performance), // _needPerformance (uint256)
        parseFloat(data.HealthandSafty), // _needHealthAndSafety (uint256)
        closingTime, // _dealClosingTime (uint256)
        { value: budgetInWei } // Send the ETH amount
      );

      console.log('Transaction sent:', tx);

      // Wait for the transaction to be mined
      await tx.wait();
      console.log('Transaction confirmed');

    } catch (error) {
      console.error('Error sending transaction:', error);
      // Optionally, handle error here
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date: Date) => {
    setData((prevData) => ({
      ...prevData,
      ClosingTime: date,
    }));
  };

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSmartContract();
    console.log("Form submitted", {
      ...data,
      ClosingTime: data.ClosingTime.getTime(),
    });
    router.push("/");
  };

  return (
    <div className="relative overflow-x-hidden h-[120vh] dark:bg-black-100">
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
          <Spotlight
            className="left-80 top-28 h-[80vh] w-[50vw]"
            fill="blue"
          />
        </div>

        <div
          className="h-[120vh] w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black-100/[0.2]
       absolute top-0 left-0 flex items-center justify-cente "
        >
          <div
            className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100
         bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
          />
        </div>

        <div className="flex justify-center relative -mt-16 z-10" id="form-inp">
          <div className="flex items-center justify-center flex-col pt-2">
            <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black-100">
              <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                Place your bid now
              </h2>
              <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                Enter the inputs according to your requirement
              </p>

              <form className="mt-2" onSubmit={handleSubmit}>
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                  <LabelInputContainer>
                    <Label htmlFor="Project_name">Project Name</Label>
                    <Input
                      id="Project_name"
                      placeholder="Tyler"
                      type="text"
                      name="ProjectName"
                      onChange={handleOnChange}
                    />
                  </LabelInputContainer>
                  <LabelInputContainer>
                    <Label htmlFor="Budget">Budget (ETH)</Label>
                    <Input
                      id="Budget"
                      placeholder="0.1"
                      type="text"
                      name="Budget"
                      onChange={handleOnChange}
                    />
                  </LabelInputContainer>
                </div>
                <LabelInputContainer className="mb-4">
                  <Label htmlFor="FinancialCapabilities">
                    Financial Capabilities
                  </Label>
                  <Input
                    id="FinancialCapabilities"
                    placeholder="Financial Capabilities"
                    type="number"
                    name="FinancialCapabilities"
                    onChange={handleOnChange}
                  />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                  <Label htmlFor="TechCapabilities">Tech Capabilities</Label>
                  <Input
                    id="TechCapabilities"
                    placeholder="rating"
                    type="number"
                    name="TechCapabilities"
                    onChange={handleOnChange}
                  />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                  <Label htmlFor="Experience">Experience</Label>
                  <Input
                    id="Experience"
                    placeholder="rating"
                    type="number"
                    name="Experience"
                    onChange={handleOnChange}
                  />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                  <Label htmlFor="Performance">Performance</Label>
                  <Input
                    id="Performance"
                    placeholder="rating"
                    type="number"
                    name="Performance"
                    onChange={handleOnChange}
                  />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                  <Label htmlFor="HealthandSafty">Health and Safety</Label>
                  <Input
                    id="HealthandSafty"
                    placeholder="rating"
                    type="text"
                    name="HealthandSafty"
                    onChange={handleOnChange}
                  />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                  <Label htmlFor="ClosingTime">Closing Time</Label>
                  <DatePicker
                    selected={data.ClosingTime}
                    // @ts-ignore
                    onChange={handleDateChange}
                    showTimeSelect
                    dateFormat="Pp"
                    className="w-full"
                  />
                </LabelInputContainer>

                <button
                  className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                  type="submit"
                >
                  Place Now &rarr;
                  <BottomGradient />
                </button>

                <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

                <button
                  className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                  type="button"
                  onClick={() => router.push("/")}
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
  );
};

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
