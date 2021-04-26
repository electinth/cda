<script lang="ts">
  import CdaSpace from '../cda-space/cda-space.svelte';
  import { CDA_COUNTS, YEARS } from '../../utils/stats';

  const data = YEARS.map((year) => {
    return new Array(CDA_COUNTS[year]).fill({});
  });

  const transitionConfig = {
    delay: 1500,
    duration: 2000,
  };
</script>

<CdaSpace {data} {transitionConfig} />
