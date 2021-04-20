<script lang="ts">
  import * as d3 from 'd3';

  import { ChartAppearance, Status } from '../components/animationConfig';
  import type { IData } from '../components/animationConfig';
  import Bargroup from '../components/bargroup.svelte';
  import type { IBargroupProps } from '../components/bargroup.svelte';

  const margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
  };

  const data2491 = [
    { x: 0, event: 'start', fill: 'black' },
    { x: 30, event: 'drafted', fill: '#0066FF' },
    { x: 137, event: 'done', fill: '#FF8A00' },
  ];
  const data2502 = [
    { x: 0, event: 'start', fill: 'black' },
    { x: 2000, event: 'drafted', fill: '#0066FF' },
    { x: 1005, event: 'done', fill: '#FF8A00' },
  ];
  const data2539 = [
    { x: 0, event: 'start', fill: 'black' },
    { x: 50, event: 'drafted', fill: '#0066FF' },
    { x: 171, event: 'done', fill: '#FF8A00' },
  ];
  const data2550 = [
    { x: 0, event: 'start', fill: 'black' },
    { x: 40, event: 'drafted', fill: '#0066FF' },
    { x: 140, event: 'done', fill: '#FF8A00' },
  ];
  function accumulateMax(data: IData[]) {
    return data.reduce((acc, cur) => (acc += cur.x), 0);
  }
  const globalMax = d3.max(
    [data2491, data2502, data2539, data2550].map(accumulateMax)
  );

  let w = 300;
  $: X = d3
    .scaleLinear()
    .domain([0, globalMax])
    .range([margin.left, w - margin.right]);

  const ChartsProps: Partial<Record<Status, IBargroupProps>> = {
    [Status.pre_start]: {
      appearance: {
        from: ChartAppearance[Status.start],
        to: ChartAppearance[Status.start],
      },
      description: {
        topicNumber: 8,
        topic: 'รัฐธรรมนูญที่ให้กำเนิด สสร.',
        description:
          'สภาร่างรัฐธรรมนูญแต่ละชุด มีต้นกำเนิดมาจากรัฐธรรมนูญต่างฉบับกัน',
        text2491: `
          <p>
            <b>167 วัน</b> นับตั้งแต่วันประชุมครั้งแรก (12 กรกฎาคม 2491) จนถึงวันประชุมครั้งสุดท้าย
            (25 ธันวาคม 2491)
          </p>`,
        text2502: `
          <p>
            <b>6 ปี 10 เดือน 10 วัน</b> นับตั้งแต่วันประชุมครั้งแรก (12 กรกฎาคม 2491)
            จนถึงวันประชุมครั้งสุดท้าย (25 ธันวาคม 2491)
          </p>`,
        text2539: `
          <p>
            <b>221 วัน</b> นับตั้งแต่วันประชุมครั้งแรก (7 มกราคม 2540) จนถึงวันประชุมครั้งรองสุดท้าย
            (15 สิงหาคม 2540)
          </p>`,
        text2550: `
          <p>
            <b>180 วัน</b> นับตั้งแต่วันประชุมครั้งแรก (8 มกราคม 2550) จนถึงวันประชุมครั้งที่
            40 (6 กรกฎาคม 2550)
          </p>`,
      },
    },
    [Status.start]: {
      appearance: {
        from: ChartAppearance[Status.start],
        to: ChartAppearance[Status.drafted],
      },
      description: {
        topicNumber: 9,
        topic: 'ระยะเวลาร่างรัฐธรรมนูญของ สสร.',
        description:
          'สภาร่างรัฐธรรมนูญแต่ละชุดใช้ระยะเวลาไม่เท่ากันในการทำงานเพื่อร่างรัฐธรรมนูญ',
        text2491: '',
        text2502: '',
        text2539: '',
        text2550: '',
      },
    },
    [Status.drafted]: {
      appearance: {
        from: ChartAppearance[Status.drafted],
        to: ChartAppearance[Status.done],
      },
      description: {
        topicNumber: 10,
        topic: 'ชะตากรรมของรัฐธรรมนูญจาก สสร.',
        description:
          'รัฐธรรมนูญที่เกิดขึ้นจากสภาร่างรัฐธรรมนูญทั้ง 4 ชุด ล้วนไม่อยู่คงทนถาวร และถูกยกเลิกโดยการทำรัฐประหารทั้งสิ้น',
        text2491: '',
        text2502: '',
        text2539: '',
        text2550: '',
      },
    },
  };
</script>

{#each Object.entries(ChartsProps) as [, props]}
  <div class="w-full h-screen p-28">
    <Bargroup
      bind:barWidth={w}
      {props}
      {X}
      {data2491}
      {data2502}
      {data2539}
      {data2550}
    />
  </div>
{/each}
