<script lang="ts">
  export let radius: number = 5,
    height = 20,
    fill = 'black',
    opacity = 1;
</script>

<g {opacity}>
  <circle r={radius} />
  <line y2={height} stroke={fill} />
</g>
