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
    new Array(cdaAmount).fill(null).map((_, sphereIndex) => {
      const group = Math.min(
        Math.floor(Math.random() * dataSphereColors.length),
        yearIndex
      );

      return sphereIndex % 10 === 0
        ? {
            primaryColor: dataSphereColors[group],
            accentColor: dataSphereColors[group],
            data: {
              number: group + 1,
            },
            group: `${group + 1}`,
            isIndividual: true,
          }
        : {
            primaryColor: new Color('#d3d3d3'),
          };
    })
  );
</script>

<CdaSpace data={demoData} />
