import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { Candidate, debounce, getData } from "../utils/helper";
import List from "../components/List";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [query, setQuery] = useState<string>("");
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedCandidates, setSelectedCandidates] = useState<Candidate[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const fetchDataDebounced = debounce(async (searchQuery: string) => {
    const search = (await getData(searchQuery)) as Candidate[];
    setCandidates(
      search.filter(
        (candidate) =>
          !selectedCandidates.some(
            (selectedCandidate) => selectedCandidate.firstName === candidate.firstName && selectedCandidate.lastName === candidate.lastName
          )
      )
    );
    setShowDropdown(search.length > 0);
  }, 150);

  useEffect(() => {
    if (query.trim() !== "") {
      fetchDataDebounced(query);
    } else {
      setCandidates([]);
      setShowDropdown(false);
    }
  }, [query]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const inputQuery: string = e.target.value;
    setQuery(inputQuery);
  };

  const handleCandidateClick = (candidate: Candidate): void => {
    setSelectedCandidates((prevCandidates) => [...prevCandidates, candidate]);
    setQuery("");
    setShowDropdown(false);
    setCandidates(candidates.filter((c) => c !== candidate));
  };
  const handleRemoveCandidate = (candidate: Candidate): void => {
    setSelectedCandidates((prevCandidates) => prevCandidates.filter((c) => c !== candidate));
    setCandidates((prevCandidates) => [...prevCandidates, candidate]);
  };
  return (
    <main className={`flex min-h-screen flex-col  p-24 " ${inter.className}`}>
      <header className="w-full  pl-5 border-b bg-white border-gray-300">
        <Image src="/logo.png" alt="Logo" width={148} height={60} priority />
      </header>
      <div className="relative mt-0 bg-white">
        <div className="pl-5 pr-5 pt-18 pb-18 bg-white">
          <p className="mt-2 font-semibold font-inter text-xs text-gray-900 leading-4 p-2">Search</p>
          <input type="text" value={query} onChange={handleInput} className="w-full border  border-gray-400 px-3 py-1 rounded" />
        </div>
        {showDropdown && (
          <div className="absolute left-0 top-20 z-10 w-full bg-white border border-gray-400 mt-1  rounded">
            {candidates.map((candidate: Candidate, index: number) => (
              <div key={index} onClick={() => handleCandidateClick(candidate)} className="cursor-pointer hover:bg-gray-100 px-3 py-1">
                {candidate.firstName} {candidate.lastName}
              </div>
            ))}
          </div>
        )}
      </div>

      <List candidates={selectedCandidates} onRemoveCandidate={handleRemoveCandidate} />
    </main>
  );
}
