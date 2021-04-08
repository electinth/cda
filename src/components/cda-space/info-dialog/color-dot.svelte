<script lang="ts">
  export let color: string;
  export let number: number | string = '';
</script>

<div
  class="flex justify-center text-center w-4 h-4 rounded-full text-white text-xs"
  style="background-color: {color};"
>
  <span class="m-auto text-body2">{number}</span>
</div>
