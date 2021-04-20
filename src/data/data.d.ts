interface Member {
  year: string;
  name: string;
}
declare module '*/all-members.csv' {
  declare const members: Member[];
  export = members;
}

declare module '*/female-members.csv' {
  declare const members: Member[];
  export = members;
}

declare module '*/multipleyear-members.csv' {
  declare const members: Member[];
  export = members;
}

declare module '*/leftearly-members.csv' {
  interface LeftearlyMember extends Member {
    category: 'death' | 'resigned';
  }

  declare const members: LeftearlyMember[];
  export = members;
}

declare module '*/family-members.csv' {
  interface FamilyMember extends Member {
    category: 'same_year' | 'different_year';
    group: string;
  }

  declare const members: FamilyMember[];
  export = members;
}

declare module '*/famous-members.csv' {
  interface FamousMember extends Member {
    description: string;
  }

  declare const members: FamousMember[];
  export = members;
}
