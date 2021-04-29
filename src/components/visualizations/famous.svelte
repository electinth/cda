<script lang="ts">
  import type { Color } from 'three';
  import famousMembers from '../../data/famous-members.csv';
  import IndividualSpaceTemplate from './individual-space-template.svelte';
  import type {
    MembersData,
    CategoryLabelMap,
  } from './individual-space-template.svelte';
  import { YEARS } from '../../utils/stats';
  import { PRIMARY_COLORS } from '../../constants/viz-color';

  const categoriesLabel: CategoryLabelMap<string> = new Map([
    ['2491', 'พ.ศ. 2491'],
    ['2502', 'พ.ศ. 2502'],
    ['2539', 'พ.ศ. 2539'],
    ['2550', 'พ.ศ. 2550'],
  ]);

  const groupsColor = new Map<string, Color>(
    ['2491', '2502', '2539', '2550'].map((category, index) => [
      category,
      PRIMARY_COLORS[index],
    ])
  );

  const yearStartIndex = new Map<string, number>(
    YEARS.map((year) => [
      year,
      famousMembers.findIndex((member) => member.year === year),
    ])
  );

  const membersData: MembersData[] = famousMembers.map(
    ({ year, ...rest }, index) => ({
      index,
      number: index - yearStartIndex.get(year) + 1,
      years: [year],
      color: groupsColor.get(year),
      description: `สภาร่างรัฐธรรมนูญ พ.ศ. ${year}`,
      image: `images/people/07_no${index + 1}_${year}.png`,
      category: year,
      group: index + 1,
      ...rest,
    })
  );
</script>

<IndividualSpaceTemplate title="สสร. คนดัง" {membersData} {categoriesLabel} />
