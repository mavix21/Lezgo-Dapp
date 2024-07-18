'use client'

import { createContext, useContext, useState } from "react";

const StepsContext = createContext<{
    currentStep: number,
    previousStep: number,
    setPreviousStep: React.Dispatch<React.SetStateAction<number>>,
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>,
    delta: number
}>({
    currentStep: 1,
    previousStep: 0,
    setPreviousStep: () => { },
    setCurrentStep: () => { },
    delta: 0
});

const StepsProvider = ({ children }: {
    children: React.ReactNode
}) => {
    const [previousStep, setPreviousStep] = useState(0)
    const [currentStep, setCurrentStep] = useState(0)
    const delta = currentStep - previousStep

    return (
        <StepsContext.Provider value={{ previousStep, setPreviousStep, currentStep, setCurrentStep, delta }}>
            {children}
        </StepsContext.Provider>
    )
}

const useSteps = () => {
    return useContext(StepsContext);
}

export { StepsProvider, useSteps }