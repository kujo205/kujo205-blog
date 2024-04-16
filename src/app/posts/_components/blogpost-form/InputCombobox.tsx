"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { DeletableButton } from "./DeletableButton";

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
import { Icons } from "@/components/icons";

type TItem = { label: string; value: string };

interface InputComboboxProps {
  items: TItem[];
  selectedItemValues: string[];
  onSelectedItemsChange: (value: string[]) => void;
  handleAddTag: (value: string) => void;
}

function InputCombobox({
  items,
  onSelectedItemsChange,
  selectedItemValues,
  handleAddTag,
}: InputComboboxProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [showAddBtn, setShowAddBtn] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const selectedItems = items.filter((item) =>
    selectedItemValues.includes(item.value),
  );

  function handleRemoveItem(value: string) {
    onSelectedItemsChange(selectedItemValues.filter((v) => v !== value));
  }

  function handleValueChange(value: string) {
    const selectedLabels = items.map((item) => item.label);
    const isLabelPresentInTheList = selectedLabels.some((v) =>
      v.includes(value),
    );
    setShowAddBtn(!isLabelPresentInTheList);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="flex flex-col items-start gap-[16px]">
        <h3 className="text-[20px] font-semibold">Add tags</h3>
        <div
          className={`flex gap-[8px] ${selectedItems.length === 0 && "hidden"}`}
        >
          {selectedItems.map(({ label, value }) => (
            <DeletableButton
              onClick={() => handleRemoveItem(value)}
              key={value}
            >
              {label}
            </DeletableButton>
          ))}
        </div>
        <PopoverTrigger asChild>
          <Button variant="outline" onClick={() => setShowAddBtn(false)}>
            Select a tag
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            ref={inputRef}
            onValueChange={handleValueChange}
            additionalChildren={
              showAddBtn && (
                <Button
                  variant="default"
                  className="p-[.25rem]"
                  onClick={() => {
                    if (!inputRef?.current) return;
                    handleAddTag(inputRef.current.value);
                  }}
                >
                  <Icons.PlusIcon />
                </Button>
              )
            }
          />
          <CommandEmpty>No tag found.</CommandEmpty>
          <CommandGroup className="max-h-[200px] overflow-auto">
            {items.map((item) => (
              <CommandItem
                key={item.value}
                value={item.value}
                onSelect={(_) => {
                  const isItemPresent = selectedItemValues.some(
                    (value) => value === item.value,
                  );
                  if (!isItemPresent)
                    onSelectedItemsChange([...selectedItemValues, item.value]);
                  else
                    onSelectedItemsChange(
                      selectedItemValues.filter(
                        (value) => value !== item.value,
                      ),
                    );
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedItemValues.some((value) => item.value === value)
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
