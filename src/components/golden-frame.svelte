<div
  class="frame m-auto p-6 text-h6 text-center w-full max-w-lg rounded-sm {$$props.class ||
    ''}"
>
  <div
    class="bg-white rounded-sm p-4 md:p-8 border border-black space-y-4 text-body1"
  >
    <slot />
  </div>
</div>

<style>
  .frame {
    background: radial-gradient(
      58.12% 58.12% at 50% 50%,
      #ffffff 0%,
      #c9bf89 100%
    );
  }
</style>
