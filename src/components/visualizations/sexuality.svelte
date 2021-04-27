<script lang="ts">
  import { Color } from 'three';
  import CdaSpace from '../cda-space/cda-space.svelte';
  import femaleMembers from '../../data/female-members.csv';
  import InfoHead from '../cda-space/info-dialog/info-head.svelte';
  import YearGroupBox from '../cda-space/info-dialog/year-group-box.svelte';
  import GroupBox from '../cda-space/info-dialog/group-box.svelte';
  import { DISABLED_COLOR, Sphere } from '../../utils/three/sphere';
  import SubgroupBox from '../cda-space/info-dialog/subgroup-box.svelte';
  import { CDA_COUNTS, YEARS } from '../../utils/stats';
  import PopulationRow from '../cda-space/info-dialog/population-row.svelte';
  import MemberRow from '../cda-space/info-dialog/member-row.svelte';
  import ControlButton from '../cda-space/info-dialog/control-button.svelte';

  interface SexualityNodeData {
    groupIndex: number;
  }

  const maleColor = new Color('#0066FF');
  const femaleColor = new Color('#19B400');

  const groups = [
    {
      name: 'allmale',
      description: 'สสร.ชุดที่มีสมาชิกเป็นเพศชายทั้งหมด',
      color: maleColor,
      years: ['2491', '2502'],
    },
    {
      name: 'mix',
      description: 'สสร.ชุดที่มีสมาชิกทั้งเพศชายและหญิง ',
      color: new Color('#FF8A00'),
      years: ['2539', '2550'],
    },
  ];

  const data = YEARS.map((year) => {
    const groupIndex = groups.findIndex(({ years }) => years.includes(year));
    const { color } = groups[groupIndex];

    const femaleCount = femaleMembers.filter((record) => record.year === year)
      .length;

    const monoColorNodes = new Array(CDA_COUNTS[year]).fill({
      primaryColor: color.clone().multiplyScalar(1.5),
      hoveredColor: color,
      group: year,
      data: {
        groupIndex,
      },
    });

    return femaleCount === 0
      ? monoColorNodes
      : monoColorNodes.map((node, index) => ({
          ...node,
          selectedColor: index < femaleCount ? femaleColor : DISABLED_COLOR,
        }));
  });

  let nodes: Sphere<SexualityNodeData>[] = [];
  let selectedNodes: Sphere<SexualityNodeData>[] = [];
  let selectedYears: string[] = [];

  const onYearSelected = ({ detail }: CustomEvent) => {
    selectedNodes = nodes.filter(({ group }) => group === detail);
  };

  $: displayGroups =
    selectedNodes.length > 0
      ? [groups[selectedNodes[0].data.groupIndex]]
      : groups;
  $: displayFemaleMembers = selectedYears
    ? femaleMembers.filter(({ year }) => selectedYears.includes(year))
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
  <InfoHead>เพศสภาพกับ สสร.</InfoHead>
  {#each displayGroups as { color, description, years }}
    <YearGroupBox
      {description}
      {years}
      {selectedYears}
      color={selectedYears && selectedYears.length > 0 ? null : color}
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
              color={femaleColor}
            />
            <p>จากจำนวนสมาชิกทั้งหมด {selectedYearPopulation} คน</p>
          </SubgroupBox>
          {#each displayFemaleMembers as { name }, index}
            <SubgroupBox>
              <MemberRow
                {name}
                number={index + 1}
                color={femaleColor}
                image="https://place-hold.it/70"
              />
            </SubgroupBox>
          {/each}
        {:else}
          <SubgroupBox>
            <PopulationRow
              isLarge
              label="สมาชิกที่เป็นเพศชาย"
              amount={selectedYearPopulation}
              color={maleColor}
            />
            <p>จากจำนวนสมาชิกทั้งหมด {selectedYearPopulation} คน</p>
          </SubgroupBox>
        {/if}
      </GroupBox>
    {/key}
  {/if}
</CdaSpace>