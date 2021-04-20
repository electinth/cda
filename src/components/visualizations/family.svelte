<script lang="ts">
  import { Color } from 'three';
  import familyMembers from '../../data/family-members.csv';
  import IndividualSpaceTemplate from './individual-space-template.svelte';
  import type {
    MembersData,
    CategoryLabelMap,
  } from './individual-space-template.svelte';

  type FamiltyMembersCategory = typeof familyMembers[0]['category'];

  const categoriesLabel: CategoryLabelMap<FamiltyMembersCategory> = new Map([
    ['same_year', 'นามสกุลเดียวกัน ในสภาร่างรัฐธรรมนูญชุดเดียวกัน'],
    ['different_year', 'นามสกุลเดียวกัน ในสภาร่างรัฐธรรมนูญชุดต่างกัน'],
  ]);

  const groupsColor = [
    new Color('#19B400'),
    new Color('#FF8A00'),
    new Color('#0066FF'),
    new Color('#FF007A'),
    new Color('#C86FFF'),
    new Color('#4BD5E8'),
    new Color('#B30D0D'),
    new Color('#D0B34B'),
    new Color('#1AB18D'),
    new Color('#C86FFF'),
  ];

  const sameYearCount = familyMembers.filter(
    ({ category }) => category === 'same_year'
  ).length;

  const membersData: MembersData[] = familyMembers.map(
    ({ year, category, group, ...rest }, index) => ({
      index,
      number: (category === 'same_year' ? index : index - sameYearCount) + 1,
      years: [year],
      color: groupsColor[+group - 1],
      description: `สภาร่างรัฐธรรมนูญ พ.ศ. ${year}`,
      image: 'https://place-hold.it/70',
      category,
      group,
      ...rest,
    })
  );
</script>

<IndividualSpaceTemplate
  title="สสร. กับนามสกุล"
  {membersData}
  {categoriesLabel}
/>
