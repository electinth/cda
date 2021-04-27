<script lang="ts">
  import { scaleLinear } from 'd3';

  import { ChartAppearance, Status } from '../timeline-bar/animationConfig';
  import type { IData } from '../timeline-bar/animationConfig';
  import Bargroup from '../timeline-bar/bargroup.svelte';
  import type { IBargroupProps } from '../timeline-bar/bargroup.svelte';

  const margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
  };

  const dataList = [
    [
      { x: 0, event: 'start', fill: 'black' },
      { x: 30, event: 'drafted', fill: '#0066FF' },
      { x: 137, event: 'done', fill: '#FF8A00' },
    ],
    [
      { x: 0, event: 'start', fill: 'black' },
      { x: 2000, event: 'drafted', fill: '#0066FF' },
      { x: 1005, event: 'done', fill: '#FF8A00' },
    ],
    [
      { x: 0, event: 'start', fill: 'black' },
      { x: 50, event: 'drafted', fill: '#0066FF' },
      { x: 171, event: 'done', fill: '#FF8A00' },
    ],
    [
      { x: 0, event: 'start', fill: 'black' },
      { x: 40, event: 'drafted', fill: '#0066FF' },
      { x: 140, event: 'done', fill: '#FF8A00' },
    ],
  ];

  function accumulateMax(data: IData[]) {
    return data.reduce((acc, cur) => (acc += cur.x), 0);
  }
  const globalMax = Math.max(...dataList.map(accumulateMax));

  let w = 300;
  $: X = scaleLinear()
    .domain([0, globalMax])
    .range([margin.left, w - margin.right]);

  const ChartsProps: Partial<Record<Status, IBargroupProps>> = {
    [Status.pre_start]: {
      appearance: {
        from: ChartAppearance[Status.pre_start],
        to: ChartAppearance[Status.start],
      },
      description: {
        topicNumber: 8,
        topic: 'รัฐธรรมนูญที่ให้กำเนิด สสร.',
        description:
          'สภาร่างรัฐธรรมนูญแต่ละชุด มีต้นกำเนิดมาจากรัฐธรรมนูญต่างฉบับกัน',
        highlights: [
          'เกิดขึ้นตามรัฐธรรมนูญชั่วคราว',
          'เกิดขึ้นตามรัฐธรรมนูญชั่วคราว',
          'เกิดขึ้นตามรัฐธรรมนูญถาวร',
          'เกิดขึ้นตามรัฐธรรมนูญชั่วคราว',
        ],
        texts: [
          'เกิดขึ้นตามรัฐธรรมนูญแห่งราชอาณาจักรไทย (ฉบับชั่วคราว) พ.ศ. 2490 (แก้ไขเพิ่มเติมครั้งที่ 2) ซึ่งเป็นรัฐธรรมนูญชั่วคราวที่ประกาศใช้ภายหลังการทำรัฐประหาร',
          'เกิดขึ้นตามธรรมนูญการปกครองราชอาณาจักร พ.ศ. 2502 ซึ่งเป็นรัฐธรรมนูญชั่วคราวที่ประกาศใช้ภายหลังการทำรัฐประหาร',
          'เกิดขึ้นรัฐธรรมนูญแห่งราชอาณาจักรไทย พ.ศ. 2534 แก้ไขเพิ่มเติมโดยรัฐธรรมนูญแห่งราชอาณาจักรไทยแก้ไขเพิ่มเติม (ฉบับที่ 6) พ.ศ. 2539 ซึ่งเป็นรัฐธรรมนูญถาวรที่ถูกร่างและประกาศใช้แทนธรรมนูญแห่งราชอาณาจักรไทย พ.ศ. 2534 อันเป็นรัฐธรรมนูญชั่วคราวที่ประกาศใช้ภายหลังการทำรัฐประหาร',
          'เกิดขึ้นตามรัฐธรรมนูญแห่งราชอาณาจักรไทย (ฉบับชั่วคราว) พ.ศ. 2549 ซึ่งเป็นรัฐธรรมนูญชั่วคราวที่ประกาศใช้ภายหลังการทำรัฐประหาร',
        ],
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
        highlights: ['167 วัน', '6 ปี 10 เดือน 10 วัน', '221 วัน', '180 วัน'],
        texts: [
          'นับตั้งแต่วันประชุมครั้งแรก (12 กรกฎาคม 2491) จนถึงวันประชุมครั้งสุดท้าย (25 ธันวาคม 2491) โดยประชุมไปทั้งหมด 81 ครั้ง',
          'นับตั้งแต่วันประชุมเพื่อการร่างรัฐธรรมนูญครั้งแรก (30 มีนาคม 2504) จนถึงวันประชุมเพื่อการร่างรัฐธรรมนูญครั้งสุดท้าย (8 กุมภาพันธ์ 2511) โดยประชุมไปทั้งหมด 66 ครั้ง ',
          'นับตั้งแต่วันประชุมครั้งแรก (7 มกราคม 2540) จนถึงวันประชุมครั้งรองสุดท้าย (15 สิงหาคม 2540) โดยประชุมไปทั้งหมด 31 ครั้ง (ครั้งที่เกี่ยวข้องกับการร่างรัฐธรรมนูญ ได้แก่ ครั้งที่ 1 ถึง ครั้งที่ 30)',
          'นับตั้งแต่วันประชุมครั้งแรก (8 มกราคม 2550) จนถึงวันประชุมครั้งที่ 40 (6 กรกฎาคม 2550) โดยประชุมไปทั้งหมด 43 ครั้ง (ครั้งที่เกี่ยวข้องกับการร่างรัฐธรรมนูญ ได้แก่ ครั้งที่ 1 ถึง ครั้งที่ 40)',
        ],
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
        highlights: [
          'มีอายุ 2 ปี 8 เดือน 6 วัน',
          'มีอายุ 3 ปี 4 เดือน 28 วัน',
          'มีอายุ 8 ปี 11 เดือน 9 วัน',
          'มีอายุ 6 ปี 9 เดือน',
        ],
        texts: [
          'และถูกยกเลิกโดยคณะรัฐประหาร ซึ่งทำรัฐประหารเมื่อวันที่ 29 พฤศจิกายน พ.ศ. 2494',
          'และถูกยกเลิกโดยคณะรัฐประหาร ซึ่งทำรัฐประหารเมื่อวันที่ 17 พฤศจิกายน พ.ศ. 2514',
          'และถูกยกเลิกโดยคณะรัฐประหาร ซึ่งทำรัฐประหารเมื่อวันที่ 19 กันยายน พ.ศ. 2549',
          'และถูกยกเลิกโดยคณะรัฐประหาร ซึ่งทำรัฐประหารเมื่อวันที่ 22 พฤษภาคม พ.ศ. 2557',
        ],
      },
    },
  };
</script>

{#each Object.entries(ChartsProps) as [, props]}
  <section class="flex flex-col w-full max-w-screen-xl mx-auto">
    <Bargroup bind:barWidth={w} {props} {X} {dataList} />
  </section>
{/each}
