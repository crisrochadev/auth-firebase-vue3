<template>
  <div class="w-full h-full flex justify-center items-center">
    <card>
      <div class="w-full flex items-center gap-2 mb-8 justify-center">

        <h2 class="text-4xl  text-cyan-600  font-extrabold">Entrar</h2>
      </div>
      <TextInput placeholder="Email" v-model:model="email" :error="errors.email.error" />
      <TextInput placeholder="Senha" v-model:model="password" :type="type" after="true">
        <template #after>
          <button @click="type = type == 'password' ? 'text' : 'password'"
            class="material-icons-outlined text-cyan-600">{{ type == 'password' ? 'visibility_off' : 'visibility'
            }}</button>
        </template>
      </TextInput>
      <p class="flex items-center justify-center gap-2">Esqueceu a senha? <router-link to="/reset"
          class=" text-cyan-600 font-bold ">Recuperar</router-link>
      </p>
      <Btn class="p-2 mt-8 w-full" @click="loginEmail">
        Entrar
      </Btn>



      <SociaisButton v-model:session="store.session" :methods="['facebook', 'google']" />

      <p class="flex mt-8 items-center justify-center gap-2">Não tem cadastro? <router-link to="/register"
          class=" text-cyan-600 font-bold ">Cadastrar</router-link>
      </p>
    </card>
  </div>
</template>

<script>
import { useAuth } from "@/stores/auth"
import Swal from 'sweetalert2'
import { useConfig } from "@/stores/config"
import Card from '@/components/Card'
import SociaisButton from '@/components/SociaisButton'
import Btn from '@/components/Btn'
import TextInput from '@/components/TextInput'
import { login } from "@/firebase"
export default {
  components: { Card, TextInput, Btn, SociaisButton },
  data() {
    const config = useConfig()
    const store = useAuth()
    return {
      store,
      config,
      email: null,
      password: null,
      type: "password",
      errors: {
        email: {
          error: false,
          errorText: null
        },
        password: {
          error: false,
          errorText: null
        }
      }
    }
  },
  computed: {
    session: {
      get() {
        return this.store.session
      },
      set(newvalue) {
        this.store.session = newvalue
      }
    }
  },
  watch: {
    session(newvalue) {
      if (newvalue && newvalue.accessToken) {
        this.$router.push("/admin")
      }
    }
  },
  mounted() {
    if (this.$route.query && this.$route.query.email) {
      this.email = this.$route.query.email;
      
    }
  },
  methods: {
    async loginEmail() {
      this.config.loading = true;
      const res = await login(this.email, this.password)
      console.log(res)
      if (res.success) {


        this.store.session = {
          ...res.user,
          accessToken: res.user.accessToken
        }
      } else {
        console.error(res)
        let message = res.error.code.includes("auth/invalid-credential") ? 'Email e/ou senha inválidos!' : 'Não foi possivel cadastrar, tente mais tarde'
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: message
        }).then(() => {
          if (message.includes('Email já cadastrado')) {
            this.$router.push('/login')
          }
        })
      }
      this.config.loading = false;

    }
  }
}
</script>

<style lang="scss" scoped></style>@/firebase/firebase@/firebase/firebase