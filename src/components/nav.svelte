<script lang="ts">
  export let activePath: string | undefined;

  const routes = [
    { label: 'หน้าหลัก', path: '' },
    { label: 'เกี่ยวกับโครงการ', path: 'about' },
  ];
</script>

<navigation-bar title-text="Constitution Drafting Assembly of Thailand">
  <div class="flex-1 flex justify-end space-x-1 md:space-x-4">
    {#each routes as { path, label }}
      <a
        href="./{path}"
        alt={label}
        class="my-auto px-2 py-1 rounded-full text-sm {path === activePath
          ? ''
          : 'hover:bg-black hover:text-white'}"
        class:font-bold={path === activePath}
      >
        <span>{label}</span>
      </a>
    {/each}
  </div>
</navigation-bar>
