import { Candidate, calculateExperience, calculateTotalExperience } from "@/utils/helper";
import Image from "next/image";

interface Props {
  candidates: Candidate[];
  onRemoveCandidate: (candidate: Candidate) => void;
}

const List: React.FC<Props> = ({ candidates, onRemoveCandidate }) => {
  return (
    <div className="bg-white pl-5 pt-6 pb-6 pr-5">
      {candidates.map((candidate, index) => (
        <div
          key={index}
          className="pl-5 pt-6 pb-6 w-full bg-white mt-0 rounded-lg border border-gray-400 border-t-0 border-t-1 border-solid relative"
        >
          <button onClick={() => onRemoveCandidate(candidate)} className="absolute top-0 right-0 p-2">
            <Image src="/close.png" alt="Logo" width={20} height={20} className="absolute top-1 right-1" priority />
          </button>
          <div className="flex justify-between">
            <div>
              <h2 className="font-bold font-inter text-22 leading-28 tracking-normal text-left w-65 h-18">
                {candidate.firstName} {candidate.lastName}
              </h2>
              <p className="flex pt-2 pb-2">
                <span>
                  <Image src="/location-on.png" alt="Location" width={16} height={16} priority />
                </span>
                {candidate.location}
              </p>
            </div>
            <div className="rounded-lg border border-gray-400 border-t-0 border-t-1 border-solid mr-5 pl-5 pb-5">
              <h2 className="mt-5 font-semibold font-inter text-xs text-gray-900 leading-4 p-2">Experience</h2>
              <p>
                <span className="font-bold pl-2 text-3xl">{calculateTotalExperience(candidate.workHistory)}</span>{" "}
                <span className="mt-5 font-semibold font-inter text-xs text-gray-900 leading-4 p-2">
                  {calculateTotalExperience(candidate.workHistory) > 1 ? "years" : "year"}
                </span>
              </p>
            </div>
          </div>

          <h6 className="font-inter font-semibold text-xs leading-4 tracking-tight text-left text-gray-500 pt-2 pb-2">Work History:</h6>
          {candidate.workHistory
            .sort((a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime())
            .map((job, i) => (
              <div key={i} className="mb-2">
                <p>
                  {job.title} at {job.company}{" "}
                  <span className="font-inter font-semibold text-xs leading-4 tracking-tight text-left text-gray-400">
                    {calculateExperience(job.startDate, job.endDate)}
                  </span>
                </p>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default List;
