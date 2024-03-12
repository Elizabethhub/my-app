import list from "../candidatesList.json";

export const getData = async (query: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const candidates = list.filter((item) => {
        const fullname = `${item.firstName} ${item.lastName}`;
        return fullname.toLowerCase().includes(query.toLowerCase());
      });
      resolve(candidates);
    }, 250);
  });
};
