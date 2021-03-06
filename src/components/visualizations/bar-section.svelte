<script lang="ts">
  import { scaleLinear } from 'd3';

  import { ChartAppearance, Status } from '../timeline-bar/animationConfig';
  import type { IData } from '../timeline-bar/animationConfig';
  import Bargroup from '../timeline-bar/bargroup.svelte';
  import type { IBargroupProps } from '../timeline-bar/bargroup.svelte';
  import { PRIMARY_COLORS } from '../../constants/viz-color';

  const margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
  };

  const fillColor = {
    start: 'black',
    drafted: `#${PRIMARY_COLORS[0].getHexString()}`,
    done: `#${PRIMARY_COLORS[1].getHexString()}`,
  };

  const dataList = [
    [
      { x: 0, event: 'start', fill: fillColor.start },
      { x: 167, event: 'drafted', fill: fillColor.drafted },
      { x: 982, event: 'done', fill: fillColor.done },
    ],
    [
      { x: 0, event: 'start', fill: fillColor.start },
      { x: 2507, event: 'drafted', fill: fillColor.drafted },
      { x: 1247, event: 'done', fill: fillColor.done },
    ],
    [
      { x: 0, event: 'start', fill: fillColor.start },
      { x: 222, event: 'drafted', fill: fillColor.drafted },
      { x: 3266, event: 'done', fill: fillColor.done },
    ],
    [
      { x: 0, event: 'start', fill: fillColor.start },
      { x: 180, event: 'drafted', fill: fillColor.drafted },
      { x: 2464, event: 'done', fill: fillColor.done },
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
          'คือรัฐธรรมนูญแห่งราชอาณาจักรไทย (ฉบับชั่วคราว) พ.ศ. 2490 (แก้ไขเพิ่มเติมครั้งที่ 2) ที่ประกาศใช้หลังการทำรัฐประหาร เมื่อวันที่ 8 พฤศจิกายน พ.ศ. 2490',
          'คือธรรมนูญการปกครองราชอาณาจักร พ.ศ. 2502 ที่ประกาศใช้หลังการทำรัฐประหาร เมื่อวันที่ 20 ตุลาคม พ.ศ. 2501',
          'คือรัฐธรรมนูญแห่งราชอาณาจักรไทย พ.ศ. 2534 แก้ไขเพิ่มเติมโดยรัฐธรรมนูญแห่งราชอาณาจักรไทยแก้ไขเพิ่มเติม (ฉบับที่ 6) พ.ศ. 2539 ซึ่งประกาศใช้แทนรัฐธรรมนูญชั่วคราว คือธรรมนูญแห่งราชอาณาจักรไทย พ.ศ. 2534 ที่ประกาศใช้หลังการทำรัฐประหาร เมื่อวันที่ 23 กุมภาพันธ์ พ.ศ. 2534',
          'คือรัฐธรรมนูญแห่งราชอาณาจักรไทย (ฉบับชั่วคราว) พ.ศ. 2549 ที่ประกาศใช้หลังการทำรัฐประหาร เมื่อวันที่ 19 กันยายน พ.ศ. 2549',
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
        highlights: [
          '167 วัน',
          '2,507 วัน (ประมาณ 6 ปี 10 เดือน 10 วัน)',
          '222 วัน',
          '180 วัน',
        ],
        texts: [
          'นับตั้งแต่การประชุมครั้งแรก (12 กรกฎาคม พ.ศ. 2491) จนถึงการประชุมเพื่อพิจารณาร่างรัฐธรรมนูญ (25 ธันวาคม พ.ศ. 2491) โดยประชุมไปทั้งสิ้น 81 ครั้ง',
          'นับตั้งแต่การประชุมในฐานะสภาร่างรัฐธรรมนูญครั้งแรก (30 มีนาคม พ.ศ. 2504) จนถึงการประชุมในฐานะสภาร่างรัฐธรรมนูญเพื่อพิจารณาร่างรัฐธรรมนูญ (8 กุมภาพันธ์ พ.ศ. 2511) โดยประชุมไปทั้งสิ้น 66 ครั้ง',
          'นับตั้งแต่การประชุมครั้งแรก (7 มกราคม พ.ศ. 2540) จนถึงการประชุมเพื่อพิจารณาร่างรัฐธรรมนูญ (15 สิงหาคม พ.ศ. 2540) โดยประชุมไปทั้งสิ้น 30 ครั้ง',
          'นับตั้งแต่การประชุมครั้งแรก (8 มกราคม พ.ศ 2550) จนถึงการประชุมเพื่อพิจารณาร่างรัฐธรรมนูญ (6 กรกฎาคม พ.ศ 2550) โดยประชุมไปทั้งสิ้น 40 ครั้ง',
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
          'สร้างรัฐธรรมนูญอายุ 982 วัน (ประมาณ 2 ปี 8 เดือน 6 วัน)',
          'สร้างรัฐธรรมนูญอายุ 1,247 วัน (ประมาณ 3 ปี 4 เดือน 28 วัน)',
          'สร้างรัฐธรรมนูญอายุ 3,266 วัน (ประมาณ 8 ปี 11 เดือน 9 วัน)',
          'สร้างรัฐธรรมนูญอายุ 2,464 วัน (ประมาณ 6 ปี 9 เดือน)',
        ],
        texts: [
          'คือรัฐธรรมนูญแห่งราชอาณาจักรไทย พุทธศักราช 2492 ที่ประกาศใช้เมื่อวันที่ 23 มีนาคม พ.ศ. 2492 และถูกยกเลิกโดยการทำรัฐประหารเมื่อวันที่ 29 พฤศจิกายน พ.ศ. 2494',
          'คือรัฐธรรมนูญแห่งราชอาณาจักรไทย พุทธศักราช 2511 ที่ประกาศใช้เมื่อวันที่ 20 มิถุนายน พ.ศ. 2511 และถูกยกเลิกโดยการทำรัฐประหารเมื่อวันที่ 17 พฤศจิกายน พ.ศ. 2514',
          'คือรัฐธรรมนูญแห่งราชอาณาจักรไทย พุทธศักราช 2540 ที่ประกาศใช้เมื่อวันที่ 11 ตุลาคม พ.ศ. 2540 และถูกยกเลิกโดยการทำรัฐประหารเมื่อวันที่ 19 กันยายน พ.ศ. 2549',
          'คือรัฐธรรมนูญแห่งราชอาณาจักรไทย พุทธศักราช 2550 ที่ประกาศใช้เมื่อวันที่ 24 สิงหาคม พ.ศ. 2550 และถูกยกเลิกโดยการทำรัฐประหารเมื่อวันที่ 22 พฤษภาคม พ.ศ. 2557',
        ],
      },
    },
  };
</script>

{#each Object.entries(ChartsProps) as [, props]}
  <section>
    <Bargroup bind:barWidth={w} {props} {X} {dataList} />
  </section>
{/each}
