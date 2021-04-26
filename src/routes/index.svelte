<script>
  import Origin from '../components/visualizations/origin.svelte';
  import Multipleyear from '../components/visualizations/multipleyear.svelte';
  import BarSection from '../components/visualizations/bar-section.svelte';
  import Variety from '../components/visualizations/variety.svelte';
  import Sexuality from '../components/visualizations/sexuality.svelte';
  import Leftearly from '../components/visualizations/leftearly.svelte';
  import Family from '../components/visualizations/family.svelte';
  import Famous from '../components/visualizations/famous.svelte';
  import Header from '../components/header.svelte';
  import Intro from '../components/visualizations/intro.svelte';

  const scrollToContent = () => {
    window.scroll({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };
</script>

<svelte:head>
  <title>ELECT - CDA</title>
</svelte:head>

<div
  class="max-w-screen-2xl w-full mx-auto space-y-16 md:space-y-32 px-2 md:px-8"
>
  <section>
    <div class="flex flex-col justify-center h-screen space-y-8">
      <h1 class="text-h4 font-semibold text-center">
        ทำความรู้จักสมาชิกสภาร่างรัฐธรรมนูญ (สสร.)<br />
        แต่ละชุดในประวัติศาสตร์การเมืองไทย
      </h1>
      <button
        class="bg-black rounded p-2 text-white text-body2 mx-auto"
        on:click={scrollToContent}
      >
        เริ่มอ่านเนื้อหา
      </button>
    </div>

    <div id="intro" class="flex h-screen">
      <p class="text-h6 text-center w-full max-w-screen-lg m-auto">
        นับตั้งแต่การเปลี่ยนแปลงการปกครองจากระบอบสมบูรณาญาสิทธิราชย์เป็นระบอบประชาธิปไตยอันมีพระมหากษัตริย์ทรงเป็นพระประมุข
        เมื่อวันที่ 24 มิถุนายน พ.ศ. 2475
        ประเทศไทยได้มีสภาร่างรัฐธรรมนูญเกิดขึ้นเพื่อมาร่างรัฐธรรมนูญแล้วจำนวนทั้งสิ้น
        4 ชุด ได้แก่ สภาร่างรัฐธรรมนูญ พ.ศ. 2491 สภาร่างรัฐธรรมนูญ พ.ศ. 2502
        สภาร่างรัฐธรรมนูญ พ.ศ. 2539 และสภาร่างรัฐธรรมนูญ พ.ศ. 2550
        โดยสมาชิกในสภาร่างรัฐธรรมนูญแต่ละชุดก็มีเรื่องราวที่น่าสนใจแตกต่างกันออกไป
      </p>
    </div>
  </section>

  <section class="space-y-8">
    <p class="text-h6 text-center w-full max-w-screen-lg m-auto">
      ELECT จะพาทุกคนทำความรู้จักสมาชิกสภาร่างรัฐธรรมนูญ (สสร.) ทั้ง 4 ชุด
      ในประเทศไทย ผ่านการนำเสนอด้วย 10 หัวข้อที่น่าสนใจเกี่ยวกับ สสร. แต่ละชุด
    </p>
    <Intro />
  </section>

  <section>
    <Header number={1}>
      <span slot="topic">ที่มาของสสร.</span>
      <span slot="description">
        ที่มาของสมาชิกสภาร่างรัฐธรรมนูญ (สสร.) 4 ชุด ของประเทศไทย
        มาจากเลือกตั้งโดยรัฐสภา 2 ชุด และการแต่งตั้งโดยพระมหากษัตริย์ 2 ชุด
        ซึ่งยังไม่เคยมีสมาชิกสภาร่างรัฐธรรมนูญชุดใดที่มาจากการเลือกตั้งโดยตรงของประชาชน
      </span>
    </Header>
    <Origin />
  </section>

  <section>
    <Header number={2}>
      <span slot="topic">ความหลากหลายของ สสร.</span>
      <span slot="description">
        โครงสร้างของสมาชิกสภาร่างรัฐธรรมนูญ (สสร.) 4 ชุด ของประเทศไทย
        มีการแบ่งประเภทสมาชิกอย่างชัดเจน 2 ชุด และไม่มีการแบ่งประเภทสมาชิก 2 ชุด
        ซึ่งยังไม่เคยมีสภาร่างรัฐธรรมนูญชุดใดที่มีสมาชิกครอบคลุมคนทุกกลุ่มในประเทศไทย
      </span>
    </Header>
    <Variety />
  </section>

  <section>
    <Header number={3}>
      <span slot="topic">เพศสภาพกับ สสร.</span>
      <span slot="description">
        โครงสร้างของสมาชิกสภาร่างรัฐธรรมนูญ (สสร.) 4 ชุด ของประเทศไทย
        มีสมาชิกที่มีเพศสภาพเป็นชายล้วน 2 ชุด
        และมีสมาชิกที่มีเพศสภาพเป็นชายและหญิง 2 ชุด
        แต่สมาชิกที่มีเพศสภาพเป็นหญิงนั้นมีในอัตราส่วนที่น้อยมาก
      </span>
    </Header>
    <Sexuality />
  </section>

  <section>
    <Header number={4}>
      <span slot="topic">สสร. มากกว่า 1 ครั้ง</span>
      <span slot="description">
        สมาชิกสภาร่างรัฐธรรมนูญ (สสร.) หลายคน ได้เป็น สสร. มากกว่า 1 ครั้ง
      </span>
    </Header>
    <Multipleyear />
  </section>

  <section>
    <Header number={5}>
      <span slot="topic">สสร. ไม่ครบวาระ</span>
      <span slot="description">
        สมาชิกสภาร่างรัฐธรรมนูญ (สสร.) หลายคน อยู่ไม่ครบวาระด้วยสาเหตุหลัก 2
        ประการ คือ เสียชีวิต และลาออก
      </span>
    </Header>
    <Leftearly />
  </section>

  <section>
    <Header number={6}>
      <span slot="topic">สสร. กับนามสกุล</span>
      <span slot="description">
        สมาชิกสภาร่างรัฐธรรมนูญ (สสร.) หลายคน มีนามสกุลเดียวกัน
        ทั้งที่อยู่ในสภาร่างรัฐธรรมนูญชุดเดียวกันและสภาร่างรัฐธรรมนูญต่างชุดกัน
      </span>
    </Header>
    <Family />
  </section>

  <section>
    <Header number={7}>
      <span slot="topic">สสร. คนดัง</span>
      <span slot="description">
        สมาชิกสภาร่างรัฐธรรมนูญ (สสร.) หลายคนเป็นที่รู้จักของสังคม
        เนื่องจากดำรงตำแหน่งสำคัญทางการเมือง หรือมีชื่อเสียงในสังคม
      </span>
    </Header>
    <Famous />
  </section>

  <BarSection />
</div>

<style>
  p {
    @apply leading-normal;
  }
</style>
