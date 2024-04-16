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

export type TItem = { label: string; value: number };

interface InputComboboxProps {
  items: TItem[];
  selectedItemValues: number[];
  onSelectedItemsChange: (value: number[]) => void;
  handleAddTag: (value: string, cb?: (items: TItem[]) => void) => void;
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

  function handleRemoveItem(value: number) {
    onSelectedItemsChange(selectedItemValues.filter((v) => v !== value));
  }

  function handleInputValueChange(value: string) {
    const selectedLabels = items.map((item) => item.label);
    const isLabelPresentInTheList = selectedLabels.some((v) =>
      v.includes(value),
    );
    setShowAddBtn(!isLabelPresentInTheList);
  }

  function onItemSelect(_value: number) {
    const isItemPresent = selectedItemValues.some((value) => value === _value);
    if (!isItemPresent) onSelectedItemsChange([...selectedItemValues, _value]);
    else {
      onSelectedItemsChange(
        selectedItemValues.filter((value) => value !== _value),
      );
    }
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
            onValueChange={handleInputValueChange}
            additionalChildren={
              showAddBtn && (
                <Button
                  variant="default"
                  className="p-[.25rem]"
                  onClick={() => {
                    if (!inputRef?.current) return;
                    setOpen(false);
                    handleAddTag(inputRef.current.value, (items) => {
                      const newItem = items.find((item) => {
                        if (!inputRef?.current) return;
                        return item.label === inputRef?.current.value;
                      });
                      if (newItem?.value) onItemSelect(newItem.value);
                    });
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
                value={item.value.toString()}
                onSelect={() => onItemSelect(item.value)}
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
