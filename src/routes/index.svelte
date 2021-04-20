<script>
  import Origin from '../components/visualizations/origin.svelte';
  import Multipleyear from '../components/visualizations/multipleyear.svelte';
  import BarSection from '../components/bar-section.svelte';
  import Variety from '../components/visualizations/variety.svelte';
  import Sexuality from '../components/visualizations/sexuality.svelte';
  import Leftearly from '../components/visualizations/leftearly.svelte';
  import Family from '../components/visualizations/family.svelte';
  import Famous from '../components/visualizations/famous.svelte';
</script>

<svelte:head>
  <title>ELECT - CDA</title>
</svelte:head>

<div class="max-w-screen-2xl w-full mx-auto space-y-32">
  <section>
    <div class="flex flex-col justify-center h-screen space-y-8">
      <h1 class="text-h4 font-semibold text-center">
        ทำความรู้จักสมาชิกสภาร่างรัฐธรรมนูญ (สสร.)<br />
        แต่ละชุดในประวัติศาสตร์การเมืองไทย
      </h1>
      <button class="bg-black rounded p-2 text-white text-body2 mx-auto"
        >เริ่มอ่านเนื้อหา</button
      >
    </div>

    <div class="flex h-screen">
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

  <section>
    <p class="text-h6 text-center w-full max-w-screen-lg m-auto">
      ELECT จะพาทุกคนทำความรู้จักสมาชิกสภาร่างรัฐธรรมนูญ (สสร.) ทั้ง 4 ชุด
      ในประเทศไทย ผ่านการนำเสนอด้วย 10 หัวข้อที่น่าสนใจเกี่ยวกับ สสร. แต่ละชุด
    </p>
  </section>

  <section>
    <h2 class="text-h3 font-bold text-center">ที่มาของสสร.</h2>
    <Origin />
  </section>

  <section>
    <h2 class="text-h3 font-bold text-center">ความหลากหลายของ สสร.</h2>
    <Variety />
  </section>

  <section>
    <h2 class="text-h3 font-bold text-center">เพศสภาพกับ สสร.</h2>
    <Sexuality />
  </section>

  <section>
    <h2 class="text-h3 font-bold text-center">สสร. มากกว่า 1 ครั้ง</h2>
    <Multipleyear />
  </section>

  <section>
    <h2 class="text-h3 font-bold text-center">สสร. ไม่ครบวาระ</h2>
    <Leftearly />
  </section>

  <section>
    <h2 class="text-h3 font-bold text-center">สสร. กับนามสกุล</h2>
    <Family />
  </section>

  <section>
    <h2 class="text-h3 font-bold text-center">สสร. คนดัง</h2>
    <Famous />
  </section>

  <section>
    <BarSection />
  </section>
</div>

<style>
  p {
    @apply leading-normal;
  }
</style>
