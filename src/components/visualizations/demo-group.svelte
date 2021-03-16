<script>
  import { Color } from 'three';
  import CdaSpace from '../cda-space/index.svelte';

  const CDA_IN_EACH_YEAR = [40, 240, 99, 100];

  const dataSphereColors = [
    new Color('#ff5555'),
    new Color('#55ff55'),
    new Color('#5555ff'),
  ];

  const demoData = CDA_IN_EACH_YEAR.map((cdaAmount, yearIndex) =>
    new Array(cdaAmount).fill({
      primaryColor: new Color('#d3d3d3'),
      accentColor: dataSphereColors[yearIndex % dataSphereColors.length],
      group: `g${(yearIndex % 3) + 1}`,
      data: {
        yearIndex,
      },
    })
  );
</script>

<CdaSpace data={demoData} />
