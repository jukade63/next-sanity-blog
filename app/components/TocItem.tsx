"use client";
import React, { useState } from "react";
import { cn, slugify } from "../utils/helpers";

interface TocItem {
  text: string;
  children: TocItem[];
}

interface TocItemProps {
  item: TocItem;
  level: number;
}

export const TocItem = ({ item, level }: TocItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children.length > 0;
  const levelToMargin = {
    0: 'ml-0',
    1: 'ml-4',
    2: 'ml-8',
    3: 'ml-12',
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };


  return (
    <li className={cn('mb-1', levelToMargin[level as keyof typeof levelToMargin])}>
      {hasChildren && (
        <span
          onClick={toggleOpen}
          className="cursor-pointer mr-2"
        >
          <span className="border-[1px] border-gray-200 rounded-sm inline-block w-[25px] text-center">
            {isOpen ? "-" : "+"}
          </span>
        </span>
      )}
      <a
        href={`#${slugify(item.text)}`}
        className="text-gray-600 dark:text-gray-400 hover:underline text-sm"
      >
        {item.text}
      </a>
      {isOpen && hasChildren && (
        <ul className="mt-1">
          {item.children.map((child) => (
            <TocItem key={child.text} item={child} level={level + 1} />
          ))}
        </ul>
      )}
    </li>
  );
};
