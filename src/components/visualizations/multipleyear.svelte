<script lang="ts">
  import { Color } from 'three';
  import multipleyearMembers from '../../data/multipleyear-members.csv';
  import IndividualSpaceTemplate from './individual-space-template.svelte';
  import type { MembersData } from './individual-space-template.svelte';

  const dataSphereColors = [
    new Color('#0066FF'),
    new Color('#FF8A00'),
    new Color('#19B400'),
    new Color('#FF007A'),
    new Color('#C86FFF'),
  ];

  const membersData: MembersData[] = multipleyearMembers.map(
    ({ year, ...rest }, index) => {
      const years = year.split(' ');

      return {
        index,
        years,
        number: index + 1,
        color: dataSphereColors[index],
        description: `เป็นสมาชิกของสภาร่างรัฐธรรมนูญ พ.ศ. ${year[0]} และสภาร่างรัฐธรรมนูญ พ.ศ. ${year[1]}`,
        image: 'https://place-hold.it/70',
        ...rest,
      };
    }
  );
</script>

<IndividualSpaceTemplate title="สสร. มากกว่า 1 ครั้ง" {membersData} />
