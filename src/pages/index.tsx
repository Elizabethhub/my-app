import { useEffect, useState } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import { getData } from "../utils/helper";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [query, setQuery] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const search = await getData("Ali");
      console.log("search", search);
    };
    fetchData();
  }, []);
  const handleInput = (e) => {
    // setQuery();
  };
  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <input type="text" onChange={handleInput}></input>
      </div>
    </main>
  );
}
