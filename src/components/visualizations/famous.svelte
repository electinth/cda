<script lang="ts">
  import { Color } from 'three';
  import famousMembers from '../../data/famous-members.csv';
  import IndividualSpaceTemplate from './individual-space-template.svelte';
  import type {
    MembersData,
    CategoryLabelMap,
  } from './individual-space-template.svelte';
  import { YEARS } from '../../utils/stats';

  const categoriesLabel: CategoryLabelMap<string> = new Map([
    ['2491', 'พ.ศ. 2491'],
    ['2502', 'พ.ศ. 2502'],
    ['2539', 'พ.ศ. 2539'],
    ['2550', 'พ.ศ. 2550'],
  ]);

  const groupsColor = new Map<string, Color>([
    ['2491', new Color('#19B400')],
    ['2502', new Color('#0066FF')],
    ['2539', new Color('#FF007A')],
    ['2550', new Color('#FF8A00')],
  ]);

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
      image: 'https://place-hold.it/70',
      category: year,
      group: index + 1,
      ...rest,
    })
  );
</script>

<IndividualSpaceTemplate title="สสร. คนดัง" {membersData} {categoriesLabel} />
