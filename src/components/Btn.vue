<template>
  <button :class="{
    'bg-cyan-600 text-white hover:bg-cyan-700' : !outline,
    'bg-white border-2 text-cyan-600 border-cyan-600 hover:border-cyan-700': outline
  }" class="rounded   flex items-center justify-center font-extrabold focus:border-2 transition-all delay-75  focus:border-cyan-800">
    <slot/>
  </button>
</template>

<script>
export default {
  props:{
    outline:{
      type:Boolean,
      default:false
    }
  },
  setup () {
    

    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>