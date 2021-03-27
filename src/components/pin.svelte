<script lang="ts">
  export let radius: number = 5,
    height = 20,
    fill = 'black';
</script>

<circle r={radius} />
<line y2={height} stroke={fill} />
