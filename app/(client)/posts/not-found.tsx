import Header from "@/app/components/Header";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div>
      <header>Page Not Found</header>
      <div>
        <Link href="/">Return Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
