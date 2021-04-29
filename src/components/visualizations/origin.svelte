<script lang="ts">
  import CdaSpace from '../cda-space/cda-space.svelte';
  import allMembers from '../../data/all-members.csv';
  import InfoHead from '../cda-space/info-dialog/info-head.svelte';
  import YearGroupBox from '../cda-space/info-dialog/year-group-box.svelte';
  import GroupBox from '../cda-space/info-dialog/group-box.svelte';
  import type { Sphere } from '../../utils/three/sphere';
  import SubgroupBox from '../cda-space/info-dialog/subgroup-box.svelte';
  import { CDA_COUNTS, YEARS } from '../../utils/stats';
  import PopulationRow from '../cda-space/info-dialog/population-row.svelte';
  import MemberRow from '../cda-space/info-dialog/member-row.svelte';
  import ControlButton from '../cda-space/info-dialog/control-button.svelte';
  import { PRIMARY_COLORS, SECONDARY_COLORS } from '../../constants/viz-color';

  interface OriginNodeData {
    groupIndex: number;
  }

  const groups = [
    {
      name: 'election',
      description: 'มีที่มาจากการเลือกตั้งโดยรัฐสภา 100%',
      primaryColor: PRIMARY_COLORS[0],
      hoveredColor: SECONDARY_COLORS[0],
      years: ['2491', '2539'],
    },
    {
      name: 'king',
      description: 'มีที่มาจากการแต่งตั้งโดยพระมหากษัตริย์ 100%',
      primaryColor: PRIMARY_COLORS[1],
      hoveredColor: SECONDARY_COLORS[1],
      years: ['2502', '2550'],
    },
  ];

  const data = YEARS.map((year) => {
    const groupIndex = groups.findIndex(({ years }) => years.includes(year));
    const { primaryColor, hoveredColor } = groups[groupIndex];

    return new Array(CDA_COUNTS[year]).fill({
      primaryColor,
      hoveredColor,
      group: year,
      data: {
        groupIndex,
      },
    });
  });

  let nodes: Sphere<OriginNodeData>[] = [];
  let selectedNodes: Sphere<OriginNodeData>[] = [];
  let selectedYears: string[] = [];

  const onYearSelected = ({ detail }: CustomEvent) => {
    selectedNodes = nodes.filter(({ group }) => group === detail);
  };

  $: displayGroups =
    selectedYears.length > 0 && selectedNodes.length > 0
      ? [groups[selectedNodes[0].data.groupIndex]]
      : groups;
  $: displayMembers = selectedYears
    ? allMembers.filter(({ year }) => selectedYears.includes(year))
    : [];
</script>

<CdaSpace {data} bind:nodes bind:selectedNodes bind:selectedYears>
  {#if selectedNodes.length > 0}
    <div class="flex justify-end">
      <ControlButton
        state="selected"
        on:click={() => {
          selectedNodes = [];
        }}
      />
    </div>
  {/if}
  <InfoHead dark>ที่มาของ สสร.</InfoHead>
  {#each displayGroups as { primaryColor: color, description, years }}
    <YearGroupBox
      {description}
      {years}
      {color}
      {selectedYears}
      on:select={onYearSelected}
    />
  {/each}
  {#if selectedYears.length > 0}
    {#key selectedYears[0]}
      <GroupBox class="flex flex-col space-y-2">
        <PopulationRow
          isLarge
          label="จำนวน สสร."
          amount={displayMembers.length}
        />
        <SubgroupBox class="max-h-64 md:max-h-96 overflow-y-auto">
          {#each displayMembers as { name }, index}
            <MemberRow
              {name}
              number={index + 1}
              color={displayGroups[0].primaryColor}
            />
          {/each}
        </SubgroupBox>
      </GroupBox>
    {/key}
  {/if}
</CdaSpace>
