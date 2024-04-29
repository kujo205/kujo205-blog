"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { SortOptionsSelect } from "./SortOptionsSelect";
import { useMemo, useState } from "react";

interface PostSearchProps {
  tags: { value: number; label: string }[];
}

function PostSearch({ tags }: PostSearchProps) {
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);

  const sortedTags = useMemo(() => {
    return tags.sort((a, b) => {
      if (selectedTagIds.includes(a.value)) {
        return -1;
      }
      return 0;
    });
  }, [selectedTagIds]);

  function handleSelectTag(tagId: number) {
    setSelectedTagIds((prev) => {
      if (prev.includes(tagId)) {
        return prev.filter((id) => id !== tagId);
      }
      return [...prev, tagId];
    });
  }

  return (
    <div className="0:w-full flex max-w-[1080px] flex-col gap-[16px]">
      {/* search with select */}
      <div className=" flex justify-between rounded bg-gradient-to-r from-[#4F3ABA] to-[#D94E68] p-[16px] max-sm:flex-col max-sm:gap-[16px]">
        <div className="flex w-full flex-[.55] gap-[8px]">
          <Input placeholder="Search for a post..." />
          <Button variant="outline" className="p-[8px]">
            <Search />
          </Button>
        </div>
        <SortOptionsSelect className="w-full flex-[.2]" />
      </div>

      {/* tags */}
      <div className="flex gap-[8px] overflow-x-auto">
        {sortedTags.map((tag) => (
          <Button
            variant={
              selectedTagIds.some((id) => id === tag.value)
                ? "outline-selected"
                : "outline"
            }
            key={tag.value}
            onClick={() => handleSelectTag(tag.value)}
          >
            {tag.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

export { PostSearch };
