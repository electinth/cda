<script lang="ts">
  import { Color } from 'three';
  import leftearlyMembers from '../../data/leftearly-members.csv';
  import IndividualSpaceTemplate from './individual-space-template.svelte';
  import type {
    MembersData,
    CategoryLabelMap,
  } from './individual-space-template.svelte';

  type LeftearlyMembersCategory = typeof leftearlyMembers[0]['category'];

  const categoriesLabel: CategoryLabelMap<LeftearlyMembersCategory> = new Map([
    ['death', 'เสียชีวิตระหว่างเป็นสมาชิกของสภาร่างรัฐธรรมนูญ'],
    ['resigned', 'ลาออกระหว่างเป็นสมาชิกของสภาร่างรัฐธรรมนูญ'],
  ]);

  const categoriesColor = new Map<LeftearlyMembersCategory, Color>([
    ['death', new Color('#19B400')],
    ['resigned', new Color('#FF8A00')],
  ]);

  const deathCount = leftearlyMembers.filter(
    ({ category }) => category === 'death'
  ).length;

  const membersData: MembersData[] = leftearlyMembers.map(
    ({ year, category, ...rest }, index) => ({
      index,
      number: (category === 'death' ? index : index - deathCount) + 1,
      years: [year],
      color: categoriesColor.get(category),
      description:
        category === 'death'
          ? `เสียชีวิตระหว่างเป็นสมาชิกของสภาร่างรัฐธรรมนูญ พ.ศ. ${year}`
          : `ลาออกระหว่างเป็นสมาชิกของสภาร่างรัฐธรรมนูญ พ.ศ. ${year}`,
      image: 'https://place-hold.it/70',
      category,
      ...rest,
    })
  );
</script>

<IndividualSpaceTemplate
  title="สสร. ไม่ครบวาระ"
  {membersData}
  {categoriesLabel}
/>
