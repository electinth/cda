<script lang="ts">
  import anime from 'animejs/lib/anime.es.js';
  import CdaSpace, { TRANSITION_DELAY } from '../cda-space/cda-space.svelte';
  import { CDA_COUNTS, YEARS } from '../../utils/stats';

  const data = YEARS.map((year) => {
    return new Array(CDA_COUNTS[year]).fill({});
  });

  const TRANSITION_END_DELAY = 2000;
  const TRANSITION_DURATION = 1500;

  const transitionDelay = TRANSITION_DURATION * 1.5 + TRANSITION_END_DELAY;

  const transitionConfig = {
    delay: transitionDelay,
    duration: transitionDelay,
  };

  let countLabelContainer: HTMLElement;

  const countLabelOffset = [24, 64, 72, 93];

  const startCountTransition = () => {
    anime({
      targets: countLabelContainer.childNodes,
      opacity: [
        { value: 0 },
        {
          value: 1,
          delay: (_, index) => TRANSITION_DELAY + index * transitionDelay,
        },
        { value: 0, delay: TRANSITION_END_DELAY },
      ],
      easing: 'linear',
      duration: TRANSITION_DURATION,
    });
  };
</script>

<div class="relative">
  <CdaSpace
    {data}
    {transitionConfig}
    on:transitionstart={startCountTransition}
  />

  <div bind:this={countLabelContainer}>
    {#each YEARS as year, index}
      <div
        class="absolute font-semibold left-0 right-0 text-center"
        style="top: {countLabelOffset[index]}%; opacity: 0;"
      >
        <p class="md:hidden">พ.ศ. {year}</p>
        <p class="text-h5">{CDA_COUNTS[year]} คน</p>
      </div>
    {/each}
  </div>
</div>
