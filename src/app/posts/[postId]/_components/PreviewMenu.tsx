"use client";
import { kebabCase } from "@/lib/textIntoKebabNotation";
import { useState, useEffect } from "react";
import { MenuItem } from "./MenuItem";

type TMenuItem = {
  name: string;
  id: string;
  // 0 || 1 || 2
  offset: number;
  startY: number;
  endY: number;
};

interface PostSearchProps {
  mdContent: string;
}

export const PreviewMenu = ({ mdContent }: PostSearchProps) => {
  const menuItems = useCreateMenuItemsFromMdContent(mdContent);
  const scrollY = useGetCurrentScrollY();

  if (menuItems.length === 0) return null;

  return (
    <aside className="sticky top-28 flex h-min w-96 flex-col gap-2 bg-gray-50 px-4 py-3 shadow-md">
      {menuItems?.map(({ id, startY, endY, offset, name }) => (
        <MenuItem
          offset={offset}
          key={id}
          title={name}
          href={`#${id}`}
          highlighted={isHighlighted(startY, endY, scrollY)}
        />
      ))}
    </aside>
  );
};

function useCreateMenuItemsFromMdContent(mdContent: string): TMenuItem[] {
  const [menuItems, setMenuItems] = useState<TMenuItem[]>([]);

  const regex = /^(#{1,3}) (.*)$/gm;

  let match;

  useEffect(() => {
    const _menuItems: TMenuItem[] = [];

    while ((match = regex.exec(mdContent)) !== null) {
      const offset = match[1]!.length - 1;
      const name = match[2]!;
      const id = kebabCase(name);

      const headerItem = document.querySelector(`#${id}`)!;

      const clientRect = headerItem?.getBoundingClientRect();
      _menuItems.push({
        startY: clientRect.top,
        endY: 0,
        offset,
        name,
        id: id!,
      });
    }

    if (_menuItems.length === 0) return;

    // @ts-expect-error: types suck
    _menuItems[0].startY = 0;

    // @ts-expect-error: types suck
    _menuItems[_menuItems.length - 1].endY = Infinity;

    for (let i = 0; i < _menuItems.length - 1; i++) {
      // @ts-expect-error: types suck
      _menuItems[i].endY = _menuItems[i + 1].startY;
    }

    setMenuItems(_menuItems);
  }, [mdContent]);

  return menuItems;
}

function useGetCurrentScrollY() {
  const scrollOffset = 0;
  const [currentPosition, setCurrentPosition] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      setCurrentPosition(window.scrollY + scrollOffset);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return currentPosition;
}

function isHighlighted(startY: number, endY: number, scrollY: number) {
  return scrollY > startY && scrollY < endY;
}
