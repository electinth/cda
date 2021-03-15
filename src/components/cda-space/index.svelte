<script lang="ts">
  import Canvas from './canvas.svelte';
  import type { NodeEventDetail } from './canvas.svelte';
  import Tooltip from './tooltip.svelte';
  import type { TooltipProps } from './tooltip.svelte';

  let tooltip: TooltipProps;

  const onMouseOverNode = ({
    detail: { offset, data },
  }: CustomEvent<NodeEventDetail>) => {
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
    on:nodeclick={console.log}
    on:nodemouseover={onMouseOverNode}
    on:nodemouseleave={() => (tooltip = null)}
  />
  {#if tooltip}
    <Tooltip {...tooltip} />
  {/if}
</div>
