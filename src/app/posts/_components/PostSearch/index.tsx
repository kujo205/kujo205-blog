"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useMemo, type SetStateAction, type Dispatch } from "react";
import { api } from "@/trpc/react";

interface PostSearchProps {
  selectedTagIds: number[];
  setSelectedTagIds: Dispatch<SetStateAction<number[]>>;
  handleSearchValueChange: (value: string) => void;
  onSearchBtnClick: () => void;
}

function PostSearch({
  setSelectedTagIds,
  selectedTagIds,
  handleSearchValueChange,
  onSearchBtnClick,
}: PostSearchProps) {
  const { data: tags } = api.post.getAllTags.useQuery();

  const sortedTags = useMemo(() => {
    if (!tags) return [];
    return tags.sort((a, b) => {
      if (selectedTagIds.includes(a.value)) {
        return -1;
      }
      return 0;
    });
  }, [selectedTagIds, tags]);

  function handleSelectTag(tagId: number) {
    setSelectedTagIds((prev) => {
      if (prev.includes(tagId)) {
        return prev.filter((id) => id !== tagId);
      }
      return [...prev, tagId];
    });
  }

  return (
    <div className="flex max-w-[1080px] flex-col gap-4 py-4 0:w-full">
      {/* search with select */}
      <div className=" flex justify-between rounded bg-gradient-to-r from-[#4F3ABA] to-[#D94E68] p-[16px] max-sm:flex-col max-sm:gap-[16px]">
        <div className="flex w-full flex-[.55] gap-[8px]">
          <Input
            placeholder="Search for a post..."
            onChange={(event) => handleSearchValueChange(event.target.value)}
          />
          <Button variant="outline" className="p-[8px]">
            <Search onChange={() => onSearchBtnClick()} />
          </Button>
        </div>
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
