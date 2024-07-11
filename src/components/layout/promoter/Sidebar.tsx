import { Button } from "@/components/ui/button";
import { Bell, Calculator, Calendar, Home, Package2, Ticket } from "lucide-react";
import Link from "next/link";
import { SiderMenuItem } from "./SiderMenuItem";

const menuItems = [
    {
        path: '/promoter/dashboard',
        icon: <Home className="h-4 w-4" />,
        title: 'Dashboard',
        subTitle: 'Visualization'
    },
    {
        path: '/promoter/event',
        icon: <Ticket className="h-4 w-4" />,
        title: 'Events',
        subTitle: 'Contador Client Side'
    }
]

export const Sidebar = () => {
    return (
        <div id="menu"
            style={{ width: '300px' }}
            className="flex max-h-screen flex-col gap-2 bg-card text-foreground">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                <Link href="/" className="flex items-center gap-2 font-semibold">
                    <Package2 className="h-6 w-6" />
                    <span>Acme Inc</span>
                </Link>
                <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                    <Bell className="h-4 w-4" />
                    <span className="sr-only">Toggle notifications</span>
                </Button>
            </div>
            <div id="nav" className="grid items-start px-2 text-sm font-medium lg:px-4">
                {
                    menuItems.map(item => (
                        <SiderMenuItem
                            key={item.path}
                            {...item}
                        />
                    ))
                }
            </div>
        </div>
    )
}
