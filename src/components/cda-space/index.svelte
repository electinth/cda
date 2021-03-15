<script lang="ts">
  import Canvas from './canvas.svelte';
  import type { DataNode } from './canvas.svelte';
  import Tooltip from './tooltip.svelte';
  import type { TooltipProps } from './tooltip.svelte';

  let tooltip: TooltipProps;
  let selectedNode: DataNode;

  const onMouseOverNode = ({
    detail: { offset, data },
  }: CustomEvent<DataNode>) => {
    if (data) {
      tooltip = {
        offset,
        label: data as string,
      };
    }
  };
</script>

<div class="w-full h-full flex-1 relative">
  <Canvas
    bind:selectedNode
    on:nodemouseover={onMouseOverNode}
    on:nodemouseleave={() => (tooltip = null)}
  />
  {#if tooltip}
    <Tooltip {...tooltip} />
  {/if}
  {#if selectedNode}
    <div class="absolute top-0 left-0">
      {JSON.stringify(selectedNode)}
    </div>
  {/if}
</div>
