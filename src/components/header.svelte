<script lang="ts">
  export let number = 0;
</script>

<div
  class="flex flex-col justify-center items-center my-9 text-center -mx-2 md:-mx-8"
>
  <div class="font-semibold">
    หัวข้อที่ {number}
  </div>

  <div class="relative flex flex-col w-full mt-4 space-y-4">
    <div class="separator" />
    <h2 class="font-heading font-semibold text-h3">
      <slot name="topic" />
    </h2>
    <div class="separator" />
  </div>

  <p class="max-w-4xl w-full mx-auto px-2 md:px-8 text-h6 mt-6">
    <slot name="description" />
  </p>
</div>

<style>
  .separator {
    background-image: url('../images/separator.png');
    background-size: contain;
    height: 2px;
  }
</style>
