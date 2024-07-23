"use client";
import React, { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { tomorrowNight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { FaCopy } from "react-icons/fa6";

interface Props {
  value: {
    code: string;
    language: string;
  };
}

const CodeBlock = ({ value }: Props) => {
  const { code, language } = value;
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <div className="relative mb-4">
      <button
        type="button"
        className="absolute top-[0.4em] right-[0.5em] z-100 bg-none border-none cursor-pointer z-10"
        title="Copy"
        onClick={handleCopy}
      >
        <div className="flex items-center gap-1">
          {copied ? (
            <span className="text-[12px] font-bold text-gray-200">Copied!</span>
          ) : (
            <FaCopy color="#9ca3af"/>
          )}
        </div>
      </button>
      <SyntaxHighlighter
        wrapLines={true}
        language={language}
        style={tomorrowNight}
        customStyle={{
            padding: "1em",
            paddingTop: "2em",
            fontSize: "14px",

        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
