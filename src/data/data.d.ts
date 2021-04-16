interface Member {
  year: string;
  name: string;
}
declare module '*/all-members.csv' {
  declare const allMembers: Member[];
  export = allMembers;
}

declare module '*/female-members.csv' {
  declare const femaleMembers: Member[];
  export = femaleMembers;
}

declare module '*/multipleyear-members.csv' {
  declare const multipleyearMembers: Member[];
  export = multipleyearMembers;
}
