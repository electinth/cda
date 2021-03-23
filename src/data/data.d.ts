declare module '*/all-members.csv' {
  interface AllMembers {
    year: string;
    name: string;
  }

  declare const allMembers: AllMembers[];

  export = allMembers;
}
