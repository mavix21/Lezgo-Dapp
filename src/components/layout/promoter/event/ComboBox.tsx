'use server'
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { db } from "@/server/db";
import { eventCategories } from "@/server/db/schema";
import { ControllerRenderProps } from "react-hook-form";

interface Props {
    onChange: (value: string) => void;
    defaultValue: string;
}

export const CategoriesCombo = async ({ onChange, defaultValue }: Props) => {

    const categories = await db.select().from(eventCategories);
    return (
        <Select onValueChange={onChange} defaultValue={defaultValue}>
            <SelectTrigger>
                <SelectValue placeholder="Select a verified email to display" />
            </SelectTrigger>
            <SelectContent>
                {categories.map((email, index) => (
                    <SelectItem key={index} value={email.id.toString()}>
                        {email.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}