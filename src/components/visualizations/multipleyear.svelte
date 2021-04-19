<script lang="ts">
  import { Color } from 'three';
  import { CDA_COUNTS, YEARS } from '../../utils/stats';
  import multipleyearMembers from '../../data/multipleyear-members.csv';
  import { pickNumbersBetween } from '../../utils/gaussian';
  import CdaSpace from '../cda-space/index.svelte';

  const dataSphereColors = [
    new Color('#0066FF'),
    new Color('#FF8A00'),
    new Color('#19B400'),
    new Color('#FF007A'),
    new Color('#C86FFF'),
  ];

  const membersData = multipleyearMembers.map((data, index) => ({
    index,
    ...data,
    color: dataSphereColors[index],
  }));

  const data = YEARS.map((year) => {
    const membersInThisYear = membersData.filter((member) =>
      member.year.includes(year)
    );
    const membersPosition = pickNumbersBetween(
      0,
      CDA_COUNTS[year],
      membersInThisYear.length
    );

    const nodes = new Array(CDA_COUNTS[year]).fill({});

    membersInThisYear.forEach(({ color, name, index }, indexInThisYear) => {
      nodes[membersPosition[indexInThisYear]] = {
        primaryColor: color,
        data: {
          name,
          number: index + 1,
        },
        group: `${index}`,
        isIndividual: true,
      };
    });

    return nodes;
  });
</script>

<CdaSpace {data} />
