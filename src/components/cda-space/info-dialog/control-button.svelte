<script lang="ts" context="module">
  export type ControlState = 'hidden' | 'expanded' | 'selected';
</script>

<script lang="ts">
  export let state: ControlState;
</script>

<button
  class="rounded-full flex p-1 font-semobold space-x-1 focus:ring ring-gold focus:outline-none {state ===
  'selected'
    ? 'bg-white border border-black'
    : 'bg-black text-white px-3'}"
  on:click
>
  {#if state === 'hidden'}
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.6667 15.8332H15V4.1665H11.6667V15.8332ZM5 15.8332H8.33333V4.1665H5V15.8332Z"
        class="fill-current"
      />
    </svg>
    <p>ดูรายชื่อ</p>
  {:else if state === 'expanded'}
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.6665 4.2832V15.9499L15.8332 10.1165L6.6665 4.2832Z"
        class="fill-current"
      />
    </svg>
    <p>ซ่อนรายชื่อ</p>
  {:else}
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.6668 4.2735L11.7268 3.3335L8.00016 7.06016L4.2735 3.3335L3.3335 4.2735L7.06016 8.00016L3.3335 11.7268L4.2735 12.6668L8.00016 8.94016L11.7268 12.6668L12.6668 11.7268L8.94016 8.00016L12.6668 4.2735Z"
        class="fill-current"
      />
    </svg>
  {/if}
</button>

<style>
  svg {
    @apply inline-block;
    @apply my-auto;
  }
</style>
