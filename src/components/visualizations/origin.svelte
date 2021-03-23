<script lang="ts">
  import { Color } from 'three';
  import CdaSpace from '../cda-space/index.svelte';
  import allMembers from '../../data/all-members.csv';
  import InfoHead from '../cda-space/info-dialog/info-head.svelte';
  import YearGroupBox from '../cda-space/info-dialog/year-group-box.svelte';
  import type { Sphere } from '../../utils/three/sphere';

  const cdaYears = [...new Set(allMembers.map(({ year }) => year))].sort();

  const cdaCount = allMembers.reduce(
    (obj, { year }) => {
      obj[year]++;
      return obj;
    },
    cdaYears.reduce((obj, year) => ({ ...obj, [year]: 0 }), {})
  );

  const groups = [
    {
      name: 'election',
      description: 'มีที่มาจากการเลือกตั้งโดยรัฐสภา 100%',
      color: new Color('#FF8A00'),
      years: ['2491', '2539'],
    },
    {
      name: 'king',
      description: 'มีที่มาจากการแต่งตั้งโดยพระมหากษัตริย์ 100%',
      color: new Color('#0066FF'),
      years: ['2502', '2550'],
    },
  ];

  const data = cdaYears.map((year) => {
    const { name, color } = groups.find(({ years }) => years.includes(year));

    return new Array(cdaCount[year]).fill({
      primaryColor: color.clone().multiplyScalar(1.5),
      accentColor: color,
      group: year,
      data: {
        group: name,
      },
    });
  });

  let nodes: Sphere[];
  let selectedNodes: Sphere[];

  const onYearSelected = ({ detail }: CustomEvent) => {
    console.log(nodes.filter(({ group }) => group === detail));
    selectedNodes = nodes.filter(({ group }) => group === detail);
  };
</script>

<CdaSpace {data} bind:selectedNodes bind:nodes>
  <InfoHead>ที่มาของ สสร.</InfoHead>
  {#each groups as group}
    <YearGroupBox {...group} on:select={onYearSelected} />
  {/each}
</CdaSpace>
