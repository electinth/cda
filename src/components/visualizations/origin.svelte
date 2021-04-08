<script lang="ts">
  import { Color } from 'three';
  import CdaSpace from '../cda-space/index.svelte';
  import allMembers from '../../data/all-members.csv';
  import InfoHead from '../cda-space/info-dialog/info-head.svelte';
  import YearGroupBox from '../cda-space/info-dialog/year-group-box.svelte';
  import GroupBox from '../cda-space/info-dialog/group-box.svelte';
  import ColorDot from '../cda-space/info-dialog/color-dot.svelte';
  import type { Sphere } from '../../utils/three/sphere';
  import SubgroupBox from '../cda-space/info-dialog/subgroup-box.svelte';
  import { CDA_COUNTS, YEARS } from '../../utils/stats';

  interface OriginNodeData {
    groupIndex: number;
  }

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

  const data = YEARS.map((year) => {
    const groupIndex = groups.findIndex(({ years }) => years.includes(year));
    const { color } = groups[groupIndex];

    return new Array(CDA_COUNTS[year]).fill({
      primaryColor: color.clone().multiplyScalar(1.5),
      hoveredColor: color,
      group: year,
      data: {
        groupIndex,
      },
    });
  });

  let nodes: Sphere<OriginNodeData>[];
  let selectedNodes: Sphere<OriginNodeData>[];
  let selectedYears: string[];

  const onYearSelected = ({ detail }: CustomEvent) => {
    selectedNodes = nodes.filter(({ group }) => group === detail);
  };

  $: displayGroups =
    selectedNodes && selectedNodes[0]
      ? [groups[selectedNodes[0].data.groupIndex]]
      : groups;
  $: displayMembers = selectedYears
    ? allMembers.filter(({ year }) => selectedYears.includes(year))
    : [];
</script>

<CdaSpace {data} bind:nodes bind:selectedNodes bind:selectedYears>
  <InfoHead>ที่มาของ สสร.</InfoHead>
  {#each displayGroups as group}
    <YearGroupBox {...group} {selectedYears} on:select={onYearSelected} />
  {/each}
  {#if selectedYears && selectedYears.length > 0}
    <GroupBox>
      <div class="flex flex-col space-y-1">
        <div class="flex flex-row space-x-1 font-semibold mx-2">
          <div>จำนวนสสร.</div>
          <div class="flex-1 text-h6 text-right">
            {displayMembers.length}
          </div>
          <div>คน</div>
        </div>
        <SubgroupBox class="max-h-64 overflow-y-auto">
          {#each displayMembers as { name }, index}
            <div class="flex flex-row space-x-2">
              <ColorDot
                color="#{displayGroups[0].color.getHexString()}"
                number={index + 1}
              />
              <div class="flex-1">{name}</div>
            </div>
          {/each}
        </SubgroupBox>
      </div>
    </GroupBox>
  {/if}
</CdaSpace>
