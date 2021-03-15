<script lang="ts" context="module">
  export interface ScreenCoord {
    x: number;
    y: number;
  }
</script>

<script lang="ts">
  import Canvas from './canvas.svelte';
  import type { DataNode } from './canvas.svelte';
  import Tooltip from './tooltip.svelte';
  import Marker from './marker.svelte';

  let hoveredNode: DataNode;
  let selectedNode: DataNode;

  const onMouseOverNode = ({ detail }: CustomEvent<DataNode>) => {
    if (detail.data) {
      hoveredNode = detail;
    }
  };
</script>

<div class="w-full h-full flex-1 relative">
  <Canvas
    bind:selectedNode
    on:nodemouseover={onMouseOverNode}
    on:nodemouseleave={() => (hoveredNode = null)}
  />
  {#if hoveredNode}
    <Tooltip {...hoveredNode} />
  {/if}
  {#if selectedNode || hoveredNode}
    <Marker {...selectedNode || hoveredNode} />
  {/if}
  {#if selectedNode}
    <div class="absolute top-0 left-0">
      {JSON.stringify(selectedNode)}
    </div>
  {/if}
</div>
