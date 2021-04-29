<script lang="ts">
  import multipleyearMembers from '../../data/multipleyear-members.csv';
  import IndividualSpaceTemplate from './individual-space-template.svelte';
  import type { MembersData } from './individual-space-template.svelte';
  import { PRIMARY_COLORS } from '../../constants/viz-color';

  const membersData: MembersData[] = multipleyearMembers.map(
    ({ year, ...rest }, index) => {
      const years = year.split(' ');

      return {
        index,
        years,
        number: index + 1,
        color: PRIMARY_COLORS[index],
        description: `เป็นสมาชิกของสภาร่างรัฐธรรมนูญ พ.ศ. ${years[0]} และสภาร่างรัฐธรรมนูญ พ.ศ. ${years[1]}`,
        image: 'https://place-hold.it/70',
        group: index + 1,
        ...rest,
      };
    }
  );
</script>

<IndividualSpaceTemplate title="สสร. มากกว่า 1 ครั้ง" {membersData} />
