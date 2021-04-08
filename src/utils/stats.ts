import allMembers from '../data/all-members.csv';

export const YEARS = [...new Set(allMembers.map(({ year }) => year))].sort();

export const CDA_COUNTS: { [year: string]: number } = allMembers.reduce(
  (obj, { year }) => {
    obj[year]++;
    return obj;
  },
  YEARS.reduce((obj, year) => ({ ...obj, [year]: 0 }), {})
);
