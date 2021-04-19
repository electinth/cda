<script lang="ts">
  import { Color } from 'three';
  import { CDA_COUNTS, YEARS } from '../../utils/stats';
  import multipleyearMembers from '../../data/multipleyear-members.csv';
  import { pickNumbersBetween } from '../../utils/gaussian';
  import CdaSpace from '../cda-space/index.svelte';
  import type { Sphere } from '../../utils/three/sphere';
  import InfoHead from '../cda-space/info-dialog/info-head.svelte';
  import GroupBox from '../cda-space/info-dialog/group-box.svelte';
  import MemberRow from '../cda-space/info-dialog/member-row.svelte';
  import SubgroupBox from '../cda-space/info-dialog/subgroup-box.svelte';

  interface MultipleyearNodeData {
    index: number;
    number: number;
    image: string;
  }

  const dataSphereColors = [
    new Color('#0066FF'),
    new Color('#FF8A00'),
    new Color('#19B400'),
    new Color('#FF007A'),
    new Color('#C86FFF'),
  ];

  const membersData = multipleyearMembers.map(({ year, ...rest }, index) => ({
    index,
    year: year.split(' '),
    color: dataSphereColors[index],
    ...rest,
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

    membersInThisYear.forEach(({ color, index }, indexInThisYear) => {
      nodes[membersPosition[indexInThisYear]] = {
        primaryColor: color,
        data: {
          index,
          number: index + 1,
          image: 'https://place-hold.it/70',
        },
        group: `${index}`,
        isIndividual: true,
      };
    });

    return nodes;
  });

  let nodes: Sphere<MultipleyearNodeData>[];
  let selectedNodes: Sphere<MultipleyearNodeData>[];
  let isGroupBoxOpened = false;

  const onMemberSelected = (index: number) => {
    selectedNodes = nodes.filter(({ data }) => data?.index === index);
  };

  const onInfoHeadClicked = () => {
    isGroupBoxOpened = !isGroupBoxOpened;

    if (!isGroupBoxOpened) {
      selectedNodes = [];
    }
  };

  $: displayMembers = isGroupBoxOpened
    ? selectedNodes && selectedNodes.length > 0
      ? [membersData.find(({ index }) => selectedNodes[0].data.index == index)]
      : membersData
    : [];

  $: {
    if (selectedNodes && selectedNodes.length > 0) {
      isGroupBoxOpened = true;
    }
  }
</script>

<CdaSpace {data} bind:nodes bind:selectedNodes isFreeze={isGroupBoxOpened}>
  <InfoHead
    class="flex flex-row space-x-2 z-20"
    on:click={() => onInfoHeadClicked()}
  >
    <div class="flex-1 my-auto">สสร. มากกว่า 1 ครั้ง</div>
    <div class="text-h4 font-bold">{membersData.length}</div>
    <div class="my-auto">คน</div>
  </InfoHead>
  <GroupBox
    class="space-y-2 {isGroupBoxOpened
      ? ''
      : 'absolute inset-0 transform translate-x-2 translate-y-2'}"
  >
    {#each displayMembers as { name, color, index, year }}
      <SubgroupBox on:click={() => onMemberSelected(index)}>
        <MemberRow
          {name}
          {color}
          number={index + 1}
          description="เป็นสมาชิกของสภาร่างรัฐธรรมนูญ พ.ศ. {year[0]} และสภาร่างรัฐธรรมนูญ พ.ศ. {year[1]}"
        />
      </SubgroupBox>
    {/each}
  </GroupBox>
</CdaSpace>
