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
  import Landing from '../components/landing.svelte';
  import Conclusion from '../components/conclusion.svelte';
</script>

<Landing />

<div class="space-y-screen-h-1/2 px-3 md:px-8">
  <section class="space-y-8 px-3 md:px-8 text-center">
    <div class="text-center w-full max-w-screen-lg m-auto space-y-2">
      <p class="text-h4 font-heading font-bold">ELECT</p>
      <p class="text-h6 leading-normal">
        จะพาทุกคนทำความรู้จักสมาชิกสภาร่างรัฐธรรมนูญ (สสร.) ทั้ง 4 ชุด
        ในประเทศไทย ผ่านการนำเสนอด้วย 10 หัวข้อที่น่าสนใจเกี่ยวกับ สสร. แต่ละชุด
      </p>
    </div>

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

  <Conclusion />
</div>

<style>
  :global(p) {
    @apply leading-normal;
  }
</style>
