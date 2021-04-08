<script lang="ts">
  import { Color } from 'three';
  import CdaSpace from '../cda-space/index.svelte';
  import InfoHead from '../cda-space/info-dialog/info-head.svelte';
  import YearGroupBox from '../cda-space/info-dialog/year-group-box.svelte';
  import GroupBox from '../cda-space/info-dialog/group-box.svelte';
  import type { Sphere } from '../../utils/three/sphere';
  import { CDA_COUNTS, YEARS } from '../../utils/stats';

  interface VarietyNodeData {
    groupIndex: number;
  }

  const groups = [
    {
      name: 'categorial',
      description: 'สสร.ชุดที่มีการแบ่งประเภทด้วยกฎหมาย',
      color: new Color('#FF8A00'),
      years: ['2491', '2539'],
    },
    {
      name: 'non-categorial',
      description: 'สสร.ชุดที่ไม่มีการแบ่งประเภทด้วยกฎหมาย',
      color: new Color('#0066FF'),
      years: ['2502', '2550'],
    },
  ];

  const subgroups = {
    '2491': {
      groups: [
        {
          color: new Color('#19B400'),
          amount: 20,
          name: 'ผู้เป็นสมาชิกรัฐสภา',
          description:
            'ประกอบด้วยสมาชิกสภาผู้แทนราษฎรและสมาชิกวุฒิสภาอย่างละ 10 คน',
        },
        {
          color: new Color('#FF007A'),
          amount: 20,
          name: 'ผู้ไม่เป็นสมาชิกรัฐสภา',
        },
      ],
    },
    '2539': {
      groups: [
        {
          color: new Color('#19B400'),
          amount: 76,
          name: 'ประชาชนผู้เป็นตัวแทนจังหวัด',
          description: 'จังหวัดละ 1 คน',
        },
        {
          color: new Color('#FF007A'),
          amount: 23,
          name: 'ผู้เชี่ยวชาญจาก 3 สาขา',
        },
      ],
    },
  };

  const data = YEARS.map((year) => {
    const groupIndex = groups.findIndex(({ years }) => years.includes(year));
    const { color } = groups[groupIndex];
    const subgroup = subgroups[year];

    const monoColorNodes = new Array(CDA_COUNTS[year]).fill({
      primaryColor: color.clone().multiplyScalar(1.5),
      hoveredColor: color,
      group: year,
      data: {
        groupIndex,
      },
    });

    return subgroup
      ? monoColorNodes.map((nodeData, nodeIndex) => ({
          ...nodeData,
          selectedColor:
            subgroup.groups[nodeIndex <= subgroup.groups[0].amount ? 0 : 1]
              .color,
        }))
      : monoColorNodes;
  });

  let nodes: Sphere<VarietyNodeData>[];
  let selectedNodes: Sphere<VarietyNodeData>[];
  let selectedYears: string[];

  const onYearSelected = ({ detail }: CustomEvent) => {
    selectedNodes = nodes.filter(({ group }) => group === detail);
  };

  $: displayGroups =
    selectedNodes && selectedNodes[0]
      ? [groups[selectedNodes[0].data.groupIndex]]
      : groups;

  $: displaySubgroup =
    selectedYears && selectedYears.length > 0 && subgroups[selectedYears[0]];
</script>

<CdaSpace {data} bind:nodes bind:selectedNodes bind:selectedYears>
  <InfoHead>ความหลากหลายของ สสร.</InfoHead>
  {#each displayGroups as group}
    <YearGroupBox {...group} {selectedYears} on:select={onYearSelected} />
  {/each}
  {#if displaySubgroup}
    <GroupBox>
      {JSON.stringify(displaySubgroup)}
    </GroupBox>
  {/if}
</CdaSpace>
