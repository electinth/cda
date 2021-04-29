<script lang="ts">
  import type { Color } from 'three';
  import leftearlyMembers from '../../data/leftearly-members.csv';
  import IndividualSpaceTemplate from './individual-space-template.svelte';
  import type {
    MembersData,
    CategoryLabelMap,
  } from './individual-space-template.svelte';
  import { PRIMARY_COLORS } from '../../constants/viz-color';

  type LeftearlyMembersCategory = typeof leftearlyMembers[0]['category'];

  const categoriesLabel: CategoryLabelMap<LeftearlyMembersCategory> = new Map([
    ['death', 'เสียชีวิตระหว่างเป็นสมาชิกของสภาร่างรัฐธรรมนูญ'],
    ['resigned', 'ลาออกระหว่างเป็นสมาชิกของสภาร่างรัฐธรรมนูญ'],
  ]);

  const categoriesColor = new Map<LeftearlyMembersCategory, Color>(
    ['death', 'resigned'].map((category: LeftearlyMembersCategory, index) => [
      category,
      PRIMARY_COLORS[index],
    ])
  );

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
      image: `images/people/05_no${index + 1}_${year}.png`,
      category,
      group: index + 1,
      ...rest,
    })
  );
</script>

<IndividualSpaceTemplate
  title="สสร. ไม่ครบวาระ"
  {membersData}
  {categoriesLabel}
/>
