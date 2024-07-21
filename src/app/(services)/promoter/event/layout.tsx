import { StepsProvider } from "@/context/ctx-event-steps";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Promoter event',
    description: 'Create and manage your events',
};

export default function DashboardLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <StepsProvider>
                {children}
                
            </StepsProvider>
        </>

    );
}