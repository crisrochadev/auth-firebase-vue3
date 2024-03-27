<template>

  <router-view />
  <Loading v-if="store.loading" />
</template>
<script>
import { useConfig } from "@/stores/config";
import Loading from "@/components/Loading.vue"
export default {
  components:{Loading},
  data() {
    const store = useConfig();
    return {
      store
    }
  }
}
</script>
