<script lang="ts" context="module">
  export interface MembersData<T = unknown> {
    index: number;
    years: string[];
    number: number;
    name: string;
    description: string;
    image: string;
    color: Color;
    group: string | number;
    category?: T;
  }

  export type CategoryLabelMap<T = unknown> = Map<T, string>;
</script>

<script lang="ts">
  import { slide } from 'svelte/transition';
  import type { Color } from 'three';
  import { CDA_COUNTS, YEARS } from '../../utils/stats';
  import { pickNumbersBetween } from '../../utils/gaussian';
  import CdaSpace from '../cda-space/cda-space.svelte';
  import type { Sphere } from '../../utils/three/sphere';
  import InfoHead from '../cda-space/info-dialog/info-head.svelte';
  import GroupBox from '../cda-space/info-dialog/group-box.svelte';
  import MemberRow from '../cda-space/info-dialog/member-row.svelte';
  import SubgroupBox from '../cda-space/info-dialog/subgroup-box.svelte';
  import ControlButton from '../cda-space/info-dialog/control-button.svelte';
  import type { ControlState } from '../cda-space/info-dialog/control-button.svelte';

  interface IndividualMemberNodeData {
    index: number;
    number: number;
    name: string;
    image: string;
  }

  export let title: string;
  export let membersData: MembersData[];
  export let categoriesLabel: CategoryLabelMap = null;

  const data = YEARS.map((year) => {
    const membersInThisYear = membersData.filter((member) =>
      member.years.includes(year)
    );
    const membersPosition = pickNumbersBetween(
      0,
      CDA_COUNTS[year],
      membersInThisYear.length
    );

    const nodes = new Array(CDA_COUNTS[year]).fill({});

    membersInThisYear.forEach(
      ({ color, index, name, number, image, group }, indexInThisYear) => {
        nodes[membersPosition[indexInThisYear]] = {
          primaryColor: color,
          data: {
            index,
            number,
            name,
            image,
          } as IndividualMemberNodeData,
          group,
          isIndividual: true,
        };
      }
    );

    return nodes;
  });

  let nodes: Sphere<IndividualMemberNodeData>[];
  let selectedNodes: Sphere<IndividualMemberNodeData>[];
  let isGroupBoxOpened = false;
  let infoHeadHeight: number = 0;

  const onMemberSelected = (selectedGroup: number | string) => {
    selectedNodes = nodes.filter(({ group }) => group === selectedGroup);
  };

  const onControlTriggered = () => {
    switch (state) {
      case 'hidden':
        isGroupBoxOpened = true;
        break;
      case 'selected':
        selectedNodes = [];
      case 'expanded':
        isGroupBoxOpened = false;
    }
  };

  $: state = (isGroupBoxOpened
    ? selectedNodes?.length > 0
      ? 'selected'
      : 'expanded'
    : 'hidden') as ControlState;

  $: displayMembers = isGroupBoxOpened
    ? selectedNodes && selectedNodes.length > 0
      ? [
          ...new Set(
            selectedNodes.map(({ data }) =>
              membersData.find(({ index }) => data.index === index)
            )
          ),
        ]
      : membersData
    : [];

  $: {
    if (selectedNodes && selectedNodes.length > 0) {
      isGroupBoxOpened = true;
    }
  }
</script>

<CdaSpace {data} bind:nodes bind:selectedNodes isFreeze={isGroupBoxOpened}>
  <div
    class="space-y-2 transition-transform duration-200 ease-in-out z-20"
    style={isGroupBoxOpened
      ? ''
      : `transform: translateY(${infoHeadHeight}px);`}
  >
    <div class="flex justify-end">
      <ControlButton {state} on:click={() => onControlTriggered()} />
    </div>
    <div bind:clientHeight={infoHeadHeight}>
      <button
        class="w-full rounded focus:ring ring-gold focus:outline-none"
        on:click={() => onControlTriggered()}
      >
        <InfoHead
          bind:clientHeight={infoHeadHeight}
          class="flex flex-row space-x-2 text-left"
        >
          <div class="flex-1 my-auto">{title}</div>
          <div class="text-h4 font-bold">{membersData.length}</div>
          <div class="my-auto">คน</div>
        </InfoHead>
      </button>
    </div>
  </div>

  <GroupBox
    style="min-height: {infoHeadHeight}px;"
    class="flex-1 overflow-y-auto space-y-2 max-h-64 md:max-h-96 transition-transform duration-200 ease-in-out {isGroupBoxOpened
      ? ''
      : 'transform translate-x-2 md:translate-x-2'}"
  >
    {#each displayMembers as { index, category, group, years, ...memberData }, displayIndex}
      <div transition:slide>
        {#if category && (displayIndex === 0 || category !== displayMembers[displayIndex - 1].category)}
          <div class="font-semibold mb-2">{categoriesLabel.get(category)}</div>
        {/if}
        <button
          class="w-full rounded focus:ring ring-gold focus:outline-none"
          on:click={() => onMemberSelected(group)}
        >
          <SubgroupBox class="text-left">
            <MemberRow {...memberData} />
          </SubgroupBox>
        </button>
      </div>
    {/each}
  </GroupBox>
</CdaSpace>
