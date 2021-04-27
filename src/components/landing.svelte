<script lang="ts">
  import { YEARS } from '../utils/stats';

  const scrollToContent = () => {
    window.scroll({
      top: window.innerHeight * 1.2,
      behavior: 'smooth',
    });
  };
</script>

<section class="mb-48">
  <div class="landing-intro">
    <div class="flex flex-col justify-center h-screen space-y-8 p-2">
      <h1 class="text-h4 md:text-h1 font-semibold text-center">
        ทำความรู้จักสมาชิกสภาร่างรัฐธรรมนูญ (สสร.)<br />
        แต่ละชุดในประวัติศาสตร์การเมืองไทย
      </h1>
      <button
        class="bg-black rounded-lg py-2 px-4 text-white text-body2 font-bold mx-auto"
        on:click={scrollToContent}
      >
        เริ่มอ่านเนื้อหา
      </button>
    </div>
  </div>

  <div class="landing-detail flex mb-24 px-1">
    <div
      class="frame m-auto p-2 md:p-8 text-h6 text-center w-full max-w-lg transform translate-y-24 rounded-sm"
    >
      <div class="bg-white rounded-sm p-2 md:p-8 border border-black space-y-4">
        <p>
          นับตั้งแต่การเปลี่ยนแปลงการปกครองจากระบอบสมบูรณาญาสิทธิราชย์เป็นระบอบประชาธิปไตยอันมีพระมหากษัตริย์ทรงเป็นพระประมุข
        </p>
        <p>
          เมื่อวันที่ 24 มิถุนายน พ.ศ. 2475
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
          โดยสมาชิกในสภาร่างรัฐธรรมนูญแต่ละชุดก็มีเรื่องราวที่น่าสนใจแตกต่างกันออกไป
        </p>
      </div>
    </div>
  </div>
</section>

<style>
  .landing-intro {
    background-image: url('/images/landing-bg.jpg');
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

  .frame {
    background: radial-gradient(
      58.12% 58.12% at 50% 50%,
      #ffffff 0%,
      #c9bf89 100%
    );
  }
</style>
