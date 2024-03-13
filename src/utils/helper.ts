import list from "../candidatesList.json";

interface WorkHistory {
  company: string;
  title: string;
  startDate: string;
  endDate: string;
}

export interface Candidate {
  firstName: string;
  lastName: string;
  location: string;
  workHistory: WorkHistory[];
}

export const getData = async (query: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const candidates = list.filter((item) => {
        const fullname = `${item.firstName} ${item.lastName}`.toLowerCase();
        return fullname.toLowerCase().includes(query.toLowerCase());
      });
      resolve(candidates);
    }, 250);
  });
};

export const debounce = <F extends (...args: any[]) => any>(func: F, delay: number) => {
  let timerId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<F>): void => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export const calculateExperience = (startDate: string, endDate: string): string => {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();

  const diff = end - start;

  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));

  let duration = "";
  if (years > 0) {
    duration += `${years} year${years !== 1 ? "s" : ""}`;
  }
  if (months > 0) {
    if (duration !== "") {
      duration += " ";
    }
    duration += `${months} month${months !== 1 ? "s" : ""}`;
  }

  return duration;
};

export const calculateTotalExperience = (workHistory: { startDate: string; endDate: string }[]): number => {
  let totalYears = 0;

  workHistory.forEach((job) => {
    const start = new Date(job.startDate).getTime();
    const end = new Date(job.endDate).getTime();

    const diff = end - start;
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));

    totalYears += years;
  });

  return totalYears;
};
