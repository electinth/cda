<script lang="ts">
  import familyMembers from '../../data/family-members.csv';
  import IndividualSpaceTemplate from './individual-space-template.svelte';
  import type {
    MembersData,
    CategoryLabelMap,
  } from './individual-space-template.svelte';
  import { PRIMARY_COLORS } from '../../constants/viz-color';

  type FamiltyMembersCategory = typeof familyMembers[0]['category'];

  const categoriesLabel: CategoryLabelMap<FamiltyMembersCategory> = new Map([
    ['same_year', 'นามสกุลเดียวกัน ในสภาร่างรัฐธรรมนูญชุดเดียวกัน'],
    ['different_year', 'นามสกุลเดียวกัน ในสภาร่างรัฐธรรมนูญชุดต่างกัน'],
  ]);

  const sameYearCount = familyMembers.filter(
    ({ category }) => category === 'same_year'
  ).length;

  const membersData: MembersData[] = familyMembers.map(
    ({ year, category, group, ...rest }, index) => ({
      index,
      number: (category === 'same_year' ? index : index - sameYearCount) + 1,
      years: [year],
      color: PRIMARY_COLORS[+group - 1],
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
