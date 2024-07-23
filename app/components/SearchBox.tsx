'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

function SearchBox() {
  const searchParams  = useSearchParams();
  const router = useRouter();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    router.push(`?${createQueryString('search', value)}`);
    
  };
  return (
    <form>
      <input type="text" placeholder="Search..." 
      className="w-full rounded-full py-2 px-4 outline-2 
       outline-amber-300 bg-gray-100 dark:bg-[#595859] dark:text-gray-100 dark:border-none"
       onChange={handleInputChange}
       />
    </form>
  );
}

export default SearchBox;
