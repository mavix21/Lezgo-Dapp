'use client'

import { getEventById } from '@/app/_actions/get-event-by-id';
import { Button } from '@/app/_components/ui/button';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/app/_components/ui/drawer';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/_components/ui/dropdown-menu';
import { Input } from '@/app/_components/ui/input';
import { Label } from '@/app/_components/ui/label';
import { useEventById } from '@/app/_hooks/use-event-by-id';
import { cn } from '@/app/_lib/utils';

import { MoreHorizontal } from 'lucide-react';
import React, { useEffect, useState } from 'react';


function ProfileForm({ eventId, className }: { eventId: string, className?: string }) {

  const { eventById, loading } = useEventById(eventId);

  return (
    <form className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Label htmlFor="name">Name of the event</Label>
        <Input id="eventName" defaultValue={eventById.name} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="username">Description of event</Label>
        <Input id="username" defaultValue="@shadcn" />
      </div>
      <Button type="submit">Save changes</Button>
    </form>
  )
}

export function ActionsMenu({ com }: { com: string }) {
  const [open, setOpen] = React.useState(false)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {/* <DropdownMenuItem onClick={() => navigator.clipboard.writeText(com)}>
          Edit
        </DropdownMenuItem> */}
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button variant="ghost" className='w-full'>Edit</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Edit event</DrawerTitle>
              <DrawerDescription>
                Make changes to your event here. Click save when you are done.
              </DrawerDescription>
            </DrawerHeader>
            <ProfileForm eventId={com} className="px-4" />
            <DrawerFooter className="pt-2">
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="w-full text-destructive">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
