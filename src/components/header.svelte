<script lang="ts">
  export let number = 0;
</script>

<div
  class="max-w-4xl flex flex-col justify-center items-center mx-auto my-9 text-center"
>
  <div class="font-semibold text-body1 border-b-2 border-black pb-1">
    หัวข้อที่ {number}
  </div>
  <h2 class="font-semibold text-h3 my-3">
    <slot name="topic" />
  </h2>
  <p class="text-body1">
    <slot name="description" />
  </p>
</div>
