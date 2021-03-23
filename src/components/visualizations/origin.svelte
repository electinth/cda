<script lang="ts">
  import { Color } from 'three';
  import CdaSpace from '../cda-space/index.svelte';
  import allMembers from '../../data/all-members.csv';

  const cdaYears = [...new Set(allMembers.map(({ year }) => year))].sort();

  const cdaCount = allMembers.reduce(
    (obj, { year }) => {
      obj[year]++;
      return obj;
    },
    cdaYears.reduce((obj, year) => ({ ...obj, [year]: 0 }), {})
  );

  const cdaGroup = [
    { name: 'election', color: new Color('#FF8A00'), years: ['2491', '2539'] },
    { name: 'king', color: new Color('#0066FF'), years: ['2502', '2550'] },
  ];

  const demoData = cdaYears.map((year) => {
    const { name, color } = cdaGroup.find(({ years }) => years.includes(year));

    return new Array(cdaCount[year]).fill({
      primaryColor: color.clone().multiplyScalar(1.5),
      accentColor: color,
      group: name,
      data: {
        group: name,
      },
    });
  });
</script>

<CdaSpace data={demoData} />
