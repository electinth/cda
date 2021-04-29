<script lang="ts">
  import type { Color } from 'three';
  import CdaSpace from '../cda-space/cda-space.svelte';
  import InfoHead from '../cda-space/info-dialog/info-head.svelte';
  import YearGroupBox from '../cda-space/info-dialog/year-group-box.svelte';
  import GroupBox from '../cda-space/info-dialog/group-box.svelte';
  import SubgroupBox from '../cda-space/info-dialog/subgroup-box.svelte';
  import type { Sphere } from '../../utils/three/sphere';
  import { CDA_COUNTS, YEARS } from '../../utils/stats';
  import PopulationRow from '../cda-space/info-dialog/population-row.svelte';
  import ControlButton from '../cda-space/info-dialog/control-button.svelte';
  import { PRIMARY_COLORS, SECONDARY_COLORS } from '../../constants/viz-color';
  interface VarietyNodeData {
    groupIndex: number;
  }

  interface Population {
    label: string;
    amount: number;
    subsets?: Array<Population>;
  }
  interface Subgroup {
    color: Color;
    amount: number;
    label: string;
    description?: string;
    subsets?: Array<Population>;
  }

  const groups = [
    {
      name: 'categorial',
      description: 'สสร.ชุดที่มีการแบ่งประเภทด้วยกฎหมาย',
      primaryColor: PRIMARY_COLORS[0],
      hoveredColor: SECONDARY_COLORS[0],
      years: ['2491', '2539'],
    },
    {
      name: 'non-categorial',
      description: 'สสร.ชุดที่ไม่มีการแบ่งประเภทด้วยกฎหมาย',
      primaryColor: PRIMARY_COLORS[1],
      hoveredColor: SECONDARY_COLORS[1],
      years: ['2502', '2550'],
    },
  ];

  const subgroups: Map<string, Subgroup[]> = new Map([
    [
      '2491',
      [
        {
          color: PRIMARY_COLORS[2],
          amount: 20,
          label: 'ผู้เป็นสมาชิกรัฐสภา',
          description:
            'ประกอบด้วยสมาชิกสภาผู้แทนราษฎรและสมาชิกวุฒิสภาอย่างละ 10 คน',
        },
        {
          color: PRIMARY_COLORS[3],
          amount: 20,
          label: 'ผู้ไม่เป็นสมาชิกรัฐสภา',
          subsets: [
            {
              label:
                'กลุ่มผู้มีคุณสมบัติของผู้สมัครรับเลือกตั้งเป็นสมาชิกสภาผู้แทน (ประเภททั่วไป)',
              amount: 5,
            },
            {
              label:
                'กลุ่มผู้ที่ดำรง หรือเคยดำรงตำแหน่งปลัดกระทรวง หรืออธิบดี หรือเทียบเท่า',
              amount: 5,
            },
            {
              label:
                'กลุ่มผู้เคยเป็นสมาชิกสภาผู้แทนราษฎร หรือสมาชิกสภาผู้แทน หรือสมาชิกพฤฒสภา หรือดำรงตำแหน่งเป็นรัฐมนตรี ',
              amount: 5,
            },
            {
              label: 'กลุ่มผู้สำเร็จการศึกษาได้รับปริญญาตรีหรือเทียบเท่า',
              amount: 5,
            },
          ],
        },
      ],
    ],
    [
      '2539',
      [
        {
          color: PRIMARY_COLORS[4],
          amount: 76,
          label: 'ประชาชนผู้เป็นตัวแทนจังหวัด',
          description: 'จังหวัดละ 1 คน',
        },
        {
          color: PRIMARY_COLORS[5],
          amount: 23,
          label: 'ผู้เชี่ยวชาญจาก 3 สาขา',
          subsets: [
            { label: 'สาขากฎหมายมหาชน', amount: 8 },
            { label: 'สาขารัฐศาสตร์ หรือรัฐประศาสนศาสตร์', amount: 8 },
            {
              label:
                'สาขาประสบการณ์ด้านการเมือง การบริหารราชการแผ่นดิน หรือการร่างรัฐธรรมนูญ',
              amount: 7,
            },
          ],
        },
      ],
    ],
    [
      '2502',
      [
        {
          color: PRIMARY_COLORS[6],
          amount: CDA_COUNTS['2502'],
          label: 'ไม่มีการแบ่งประเภท (ด้วยกฎหมาย)',
          subsets: [
            {
              label: 'เป็นทหาร',
              amount: 162,
              subsets: [
                { label: 'ทหารบก', amount: 110 },
                {
                  label: 'ทหารเรือ',
                  amount: 27,
                },
                {
                  label: 'ทหารอากาศ',
                  amount: 25,
                },
              ],
            },
            {
              label: 'ไม่เป็นทหาร',
              amount: 78,
            },
          ],
        },
      ],
    ],
    [
      '2550',
      [
        {
          color: PRIMARY_COLORS[7],
          amount: CDA_COUNTS['2550'],
          label: 'ไม่มีการแบ่งประเภท (ด้วยกฎหมาย)',
          subsets: [
            {
              label: 'ภาครัฐ',
              amount: 30,
            },
            {
              label: 'ภาควิชาการ',
              amount: 27,
            },
            {
              label: 'ภาคเอกชน',
              amount: 25,
            },
            {
              label: 'ภาคสังคม',
              amount: 18,
            },
          ],
        },
      ],
    ],
  ]);

  const data = YEARS.map((year) => {
    const groupIndex = groups.findIndex(({ years }) => years.includes(year));
    const { primaryColor, hoveredColor } = groups[groupIndex];
    const subgroup = subgroups.get(year);

    const monoColorNodes = new Array(CDA_COUNTS[year]).fill({
      primaryColor,
      hoveredColor,
      group: year,
      data: {
        groupIndex,
      },
    });

    return subgroup
      ? monoColorNodes.map((nodeData, nodeIndex) => ({
          ...nodeData,
          selectedColor:
            subgroup[nodeIndex <= subgroup[0].amount ? 0 : 1].color,
        }))
      : monoColorNodes;
  });

  let nodes: Sphere<VarietyNodeData>[] = [];
  let selectedNodes: Sphere<VarietyNodeData>[] = [];
  let selectedYears: string[] = [];

  const onYearSelected = ({ detail }: CustomEvent) => {
    selectedNodes = nodes.filter(({ group }) => group === detail);
  };

  $: displayGroups =
    selectedYears.length > 0 && selectedNodes.length > 0
      ? [groups[selectedNodes[0].data.groupIndex]]
      : groups;

  $: displaySubgroup = selectedYears && subgroups.get(selectedYears[0]);
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
  <InfoHead dark>ความหลากหลายของ สสร.</InfoHead>
  {#each displayGroups as { primaryColor, description, years }}
    <YearGroupBox
      {description}
      {years}
      {selectedYears}
      color={displaySubgroup ? null : primaryColor}
      on:select={onYearSelected}
    />
  {/each}
  {#if displaySubgroup}
    {#key selectedYears[0]}
      <GroupBox class="space-y-2">
        {#each displaySubgroup as { description, subsets, ...populationProps }}
          <SubgroupBox class="flex flex-col">
            <PopulationRow {...populationProps} isLarge />
            <div
              class="flex flex-col ml-8 divide-y divide-black divide-opacity-20"
            >
              {#if description}
                <p>{description}</p>
              {/if}
              {#if subsets}
                {#each subsets as { subsets, ...population }}
                  <PopulationRow {...population} class="py-2" />
                  {#if subsets}
                    {#each subsets as { subsets, ...population }}
                      <PopulationRow {...population} class="ml-6 py-2" />
                    {/each}
                  {/if}
                {/each}
              {/if}
            </div>
          </SubgroupBox>
        {/each}
      </GroupBox>
    {/key}
  {/if}
</CdaSpace>
