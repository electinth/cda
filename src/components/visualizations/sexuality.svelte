<script lang="ts">
  import CdaSpace from '../cda-space/cda-space.svelte';
  import femaleMembers from '../../data/female-members.csv';
  import InfoHead from '../cda-space/info-dialog/info-head.svelte';
  import YearGroupBox from '../cda-space/info-dialog/year-group-box.svelte';
  import GroupBox from '../cda-space/info-dialog/group-box.svelte';
  import type { Sphere } from '../../utils/three/sphere';
  import SubgroupBox from '../cda-space/info-dialog/subgroup-box.svelte';
  import { CDA_COUNTS, YEARS } from '../../utils/stats';
  import PopulationRow from '../cda-space/info-dialog/population-row.svelte';
  import MemberRow from '../cda-space/info-dialog/member-row.svelte';
  import ControlButton from '../cda-space/info-dialog/control-button.svelte';
  import {
    PRIMARY_COLORS,
    SECONDARY_COLORS,
    DISABLED_COLOR,
  } from '../../constants/viz-color';

  interface SexualityNodeData {
    groupIndex: number;
  }

  const groups = [
    {
      name: 'allmale',
      description: 'สสร.ชุดที่มีสมาชิกเป็นเพศชายทั้งหมด',
      primaryColor: PRIMARY_COLORS[0],
      hoveredColor: SECONDARY_COLORS[0],
      years: ['2491', '2502'],
    },
    {
      name: 'mix',
      description: 'สสร.ชุดที่มีสมาชิกทั้งเพศชายและหญิง ',
      primaryColor: PRIMARY_COLORS[1],
      hoveredColor: SECONDARY_COLORS[1],
      years: ['2539', '2550'],
    },
  ];

  const femaleMembersWithImage = femaleMembers.map((member, index) => ({
    ...member,
    image: `images/people/03_no${index + 1}_${member.year}.png`,
  }));

  const data = YEARS.map((year) => {
    const groupIndex = groups.findIndex(({ years }) => years.includes(year));
    const { primaryColor, hoveredColor } = groups[groupIndex];

    const femaleCount = femaleMembers.filter((record) => record.year === year)
      .length;

    const monoColorNodes = new Array(CDA_COUNTS[year]).fill({
      primaryColor,
      hoveredColor,
      group: year,
      data: {
        groupIndex,
      },
    });

    return femaleCount === 0
      ? monoColorNodes
      : monoColorNodes.map((node, index) => ({
          ...node,
          selectedColor:
            index < femaleCount ? PRIMARY_COLORS[2] : DISABLED_COLOR,
        }));
  });

  let nodes: Sphere<SexualityNodeData>[] = [];
  let selectedNodes: Sphere<SexualityNodeData>[] = [];
  let selectedYears: string[] = [];

  const onYearSelected = ({ detail }: CustomEvent) => {
    selectedNodes = nodes.filter(({ group }) => group === detail);
  };

  $: displayGroups =
    selectedYears.length > 0 && selectedNodes.length > 0
      ? [groups[selectedNodes[0].data.groupIndex]]
      : groups;
  $: displayFemaleMembers = selectedYears
    ? femaleMembersWithImage.filter(({ year }) => selectedYears.includes(year))
    : [];
  $: selectedYearPopulation = selectedYears && CDA_COUNTS[selectedYears[0]];
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
  <InfoHead dark>เพศสภาพกับ สสร.</InfoHead>
  {#each displayGroups as { primaryColor, description, years }}
    <YearGroupBox
      {description}
      {years}
      {selectedYears}
      color={selectedYears && selectedYears.length > 0 ? null : primaryColor}
      on:select={onYearSelected}
    />
  {/each}
  {#if selectedYears.length > 0}
    {#key selectedYears[0]}
      <GroupBox
        class="flex flex-col space-y-2 max-h-64 md:max-h-96 overflow-y-auto"
      >
        {#if displayFemaleMembers.length > 0}
          <SubgroupBox>
            <PopulationRow
              isLarge
              label="สมาชิกที่เป็นเพศหญิง"
              amount={displayFemaleMembers.length}
              color={PRIMARY_COLORS[2]}
            />
            <p>จากจำนวนสมาชิกทั้งหมด {selectedYearPopulation} คน</p>
          </SubgroupBox>
          {#each displayFemaleMembers as { name, image }, index}
            <SubgroupBox>
              <MemberRow
                {name}
                number={index + 1}
                color={PRIMARY_COLORS[2]}
                {image}
              />
            </SubgroupBox>
          {/each}
        {:else}
          <SubgroupBox>
            <PopulationRow
              isLarge
              label="สมาชิกที่เป็นเพศชาย"
              amount={selectedYearPopulation}
              color={PRIMARY_COLORS[0]}
            />
            <p>จากจำนวนสมาชิกทั้งหมด {selectedYearPopulation} คน</p>
          </SubgroupBox>
        {/if}
      </GroupBox>
    {/key}
  {/if}
</CdaSpace>
