'use client';
import { getEventCategories } from '@/actions/get-event-categories';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEventCategories } from '@/hooks/use-event-categories';
import { db } from '@/server/db';
import { eventCategories } from '@/server/db/schema';
import { Column } from '@tanstack/react-table';
import { FilterIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export function DataTableCategoryFilter({
  column,
}: {
  column: Column<any, unknown>;
}) {
  const columnFilterValue = column.getFilterValue();
  const filterVariant = column.columnDef.meta ?? {};

  const { categories, loading } = useEventCategories();

  //   const [selectedFilter, setSelectedFilter] = useState(null);
  //   const filters = [
  //     'Art & Culture',
  //     'Concerts',
  //     'Sports',
  //     'Festivals',
  //     'Theater',
  //     'Circus',
  //   ];
  //   const handleFilterChange = (filter: any) => {
  //     setSelectedFilter(filter);
  //   };

  return filterVariant === 'select' ? (
    <div className="inline-block text-left">
      <div className="flex items-center space-x-2">
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <FilterIcon className="w-5 h-5" />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Filter by</DropdownMenuLabel>
            {filters.map((filter) => (
              <DropdownMenuItem
                key={filter}
                onClick={() => handleFilterChange(filter)}
              >
                {filter}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu> */}
        <Select
          onValueChange={(value) => column.setFilterValue(value)}
          value={columnFilterValue?.toString() || ''}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category: any) => (
              <SelectItem key={category.id} value={category.name}>
                {category.name}
              </SelectItem>
            ))}
            <Button
              className="w-full px-2"
              variant="secondary"
              size="sm"
              onClick={(value) => {
                value.stopPropagation();
                column.setFilterValue('');
              }}
            >
              Clear filters
            </Button>
          </SelectContent>
        </Select>
      </div>
    </div>
  ) : (
    <div>
      <div className="h-1" />
    </div>
  );
}
