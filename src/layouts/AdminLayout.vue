<template>
  <div class="w-[100svw] h-[100svh] flex justify-center items-start flex-wrap overflow-hidden">
    <div class="w-full p-2 flex items-center justify-between bg-cyan-100 flex-wrap">
      <div>
        <router-link class="p-2 text-sm uppercase font-bold text-cyan-600 transition-all delay-100"
          :class="[$route.path == '/' ? 'bg-gray-200' : '']" to="/">Inicio</router-link>
        <router-link :class="[$route.path == '/login' ? 'bg-gray-200' : '']"
          class="p-2 uppercase font-bold text-sm text-cyan-600 transition-all delay-100" to="/login">Autenticação</router-link>
      </div>
      <button @click="signout" class="material-icons-outlined border-1 p-2 text-cyan-600 hover:text-cyan-800 focus:border-1 focus:border-cyan-800 rounded focus:p-1">logout</button>
    </div>
    <main class=" w-full h-[calc(100svh_-_40px)] overflow-auto ">
      <router-view :key="$route.path" />
    </main>
  </div>
</template>

<script>
import { logout } from "../firebase"
import Swal from 'sweetalert2'
export default {
  data() {


    return {}
  },
  methods:{
    async signout(){
      const res = await logout();
      if(!res.success){
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Não foi possivel logar, tente mais tarde",
        });
      }else{
        this.$router.push("/")
      }
    }
  }

}
</script>
../firebase/firebase../firebase/firebase