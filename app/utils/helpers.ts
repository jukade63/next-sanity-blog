
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

type HeadingBlock = {
  _key: string;
  style: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: { text: string }[];
};

type TocItem = {
  text: string;
  children: TocItem[];
};

type ProcessHeadings = (headings: HeadingBlock[]) => TocItem[];

export const processHeadings: ProcessHeadings = (headings) => {
  const toc: TocItem[] = [];
  const stack: { level: number; item: TocItem }[] = [];

  const getLevel = (style: string) => parseInt(style.substring(1));

  headings.forEach((heading) => {
    const text = heading.children.map((child) => child.text).join(" ");
    const level = getLevel(heading.style);

    const newItem: TocItem = { text, children: [] };

    while (stack.length > 0 && stack[stack.length - 1].level >= level) {
      stack.pop();
    }

    if (stack.length === 0) {
      toc.push(newItem);
    } else {
      stack[stack.length - 1].item.children.push(newItem);
    }

    stack.push({ level, item: newItem });
  });

  return toc;
};

 
export function cn(...args: ClassValue[]) {
  return twMerge(clsx(args));
}