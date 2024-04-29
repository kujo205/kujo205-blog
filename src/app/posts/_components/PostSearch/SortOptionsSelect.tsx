import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SortOptionsSelectProps {
  className?: string;
}

export function SortOptionsSelect({ className }: SortOptionsSelectProps) {
  return (
    <Select>
      <SelectTrigger className={className}>
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="liked">Most Liked</SelectItem>
        <SelectItem value="popular">Most Popular</SelectItem>
        <SelectItem value="new">Newest First</SelectItem>
        <SelectItem value="old">Oldest First</SelectItem>
      </SelectContent>
    </Select>
  );
}
