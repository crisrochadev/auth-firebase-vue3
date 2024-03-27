<template>
  <label class="w-full flex flex-wrap m-1">
    <span class="pl-1 uppercase font-bold text-cyan-600 block w-full" v-if="label">{{ label }}</span>
    <div class="w-[30px] flex justify-center items-center" v-if="before">
      <slot name="before">
        o
      </slot>
    </div>
    <input @input="$emit('input',value)" :placeholder="placeholder" v-model="value" :type="type"
    :class="[error ? 'border-red-600 focus:outline-red-800 ' : 'border-cyan-600 focus:outline-cyan-800 ']"
      class="placeholder:text-cyan-600 placeholder:font-semibold h-10 border  rounded p-2 text-cyan-600" :style="{
        width:(after && !before) || (!after && before) ? 'calc(100% - 30px)' : after && before ? 'calc(100% - 60px)' : '100%'
      }"/>
    <div class="w-[30px] flex justify-center items-center" v-if="after">
      <slot name="after">
        o
      </slot>
    </div>
    <div class="w-full my-1  text-xs text-red-600 px-2  flex items-center gap-2" >
      <span class="material-icons-outlined text-[5px]" style="font-size:14px" v-if="error">error</span>
      {{ errorText }}
    </div>
  </label>
</template>

<script>
export default {
  props: ['label', 'placeholder', 'type', 'model', 'before', 'after', 'error', 'errorText'],
  emits:['update:model','input'],
  computed:{
    value:{
      get(){
        return this.model
      },
      set(newvalue){
        this.$emit('update:model',newvalue)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>