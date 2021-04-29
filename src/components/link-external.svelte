<script lang="ts">
  export let href: string;
</script>

<a
  {href}
  target="_blank"
  rel="noopener noreferrer"
  class="break-words text-blue-900 hover:underline"
>
  <slot />
</a>
