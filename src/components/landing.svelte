<script lang="ts">
  import { YEARS } from '../utils/stats';
  import GoldenFrame from './golden-frame.svelte';

  const scrollToContent = () => {
    window.scroll({
      top: window.innerHeight * 1.2,
      behavior: 'smooth',
    });
  };
</script>

<section class="mb-48">
  <div class="landing-intro">
    <div class="flex flex-col h-screen">
      <h1
        class="font-heading text-h4 md:text-h1 font-bold text-center mt-44 md:mt-52 mx-auto p-2 bg-white"
      >
        ทำความรู้จักสมาชิก<br />
        สภาร่างรัฐธรรมนูญ (สสร.) <br class="md:hidden" />
        แต่ละชุด<br class="hidden md:inline" />
        ในประวัติศาสตร์<br class="md:hidden" />การเมืองไทย
      </h1>
      <button
        class="bg-black rounded-lg py-2 px-4 md:py-4 md:px-6 text-white md:text-h6 font-bold mx-auto mt-16 md:mt-36"
        on:click={scrollToContent}
      >
        เริ่มอ่านเนื้อหา
      </button>
    </div>
  </div>

  <div class="landing-detail flex mb-24">
    <GoldenFrame class="transform translate-y-24">
      <p>
        นับตั้งแต่การเปลี่ยนแปลงการปกครองจากระบอบสมบูรณาญาสิทธิราชย์เป็นระบอบประชาธิปไตยอันมีพระมหากษัตริย์ทรงเป็นพระประมุข
      </p>
      <p>
        ประเทศไทยได้มีสภาร่างรัฐธรรมนูญเกิดขึ้นเพื่อมาร่างรัฐธรรมนูญแล้วจำนวนทั้งสิ้น
        4 ชุด
      </p>
      <p>............</p>
      <p>
        ได้แก่
        {#each YEARS as year}
          <br />สภาร่างรัฐธรรมนูญ พ.ศ. {year}
        {/each}
      </p>
      <p>
        โดยสมาชิกสภาร่างรัฐธรรมนูญแต่ละชุดก็มีเรื่องราวที่น่าสนใจแตกต่างกันออกไป
      </p>
    </GoldenFrame>
  </div>
</section>

<style>
  .landing-intro {
    background-image: url('../images/landing-bg.png');
    height: 120vh;
    @apply bg-cover;
    @apply bg-top;
  }

  .landing-detail {
    background: linear-gradient(
      180deg,
      rgba(201, 191, 138, 0) 0%,
      rgba(201, 191, 138, 0.4) 100%
    );
  }
</style>
