"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

type TItem = { label: string; value: string };

interface InputComboboxProps {
  items: TItem[];
  selectedItems: string[];
  onSelectedItemsChange: (value: string[]) => void;
}

function InputCombobox({
  items,
  onSelectedItemsChange,
  selectedItems,
}: InputComboboxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div>
        <PopoverTrigger asChild>
          <Button variant="outline">Select a tag</Button>
        </PopoverTrigger>
        {items.map((item) => (
          <Button key={item.value}>{item.label}</Button>
        ))}
      </div>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput></CommandInput>
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {items.map((item) => (
              <CommandItem
                key={item.value}
                value={item.value}
                onSelect={(_) => {
                  const isItemPresent = selectedItems.some(
                    (value) => value === item.value,
                  );
                  if (!isItemPresent)
                    onSelectedItemsChange([...selectedItems, item.value]);
                  else
                    onSelectedItemsChange(
                      selectedItems.filter((value) => value !== item.value),
                    );
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedItems.some((value) => item.value === value)
                      ? "opacity-100"
                      : "opacity-0",
                  )}
                />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export { InputCombobox };
