import React from "react";
import { TocItem } from "./TocItem";
import { processHeadings } from "../utils/helpers";
import { Roboto } from "next/font/google";


const roboto = Roboto({ subsets: ["latin"], weight: "700" });


const Toc = ({ headings }: any) => {
  if (!headings) {
    return null;
  }

  const toc = processHeadings(headings);
  

  return (
    <div className="border rounded-sm px-4 pb-2 border-gray-400 dark:border-gray-200  ">
      <h2 className={`text-lg font-bold p-2 mb-2 text-center ${roboto.className}`}>
        Table of Contents
      </h2>
      <nav>
        <ul>
          {toc.map((item) => (
            <TocItem key={item.text} item={item} level={0} />
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Toc;
