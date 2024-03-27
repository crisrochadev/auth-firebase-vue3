<template>
  <div class="w-full h-full flex justify-center items-center">
    <card>
      <div class="w-full flex items-center gap-2 mb-8 justify-center">

        <h2 class=" text-4xl  text-cyan-600  font-extrabold">Recuperar Senha</h2>
      </div>
      <p class="px-2 mb-4 leading-5 flex items-center justify-center gap-2">Digite seu email que enviaremos um link para
        resuperação:
      </p>
      <TextInput :errorText="errors.email.errorText" @input="testEmail" placeholder="Email" v-model:model="email" :error="errors.email.error" />

      <Btn class="p-2 mt-4 w-full" @click="sendEmail">
        Enviar
      </Btn>





      <p class="flex mt-8 items-center justify-center gap-2">Lembrou a senha? <router-link to="/login"
          class=" text-cyan-600 font-bold ">Entrar</router-link>
      </p>
    </card>
  </div>
</template>

<script>
import Card from '@/components/Card'
import { resetPassword } from "@/firebase"
import SociaisButton from '@/components/SociaisButton'
import Btn from '@/components/Btn'
import { useConfig } from '@/stores/config'
import Swal from 'sweetalert2'
import TextInput from '@/components/TextInput'
export default {
  components: { Card, TextInput, Btn, SociaisButton },
  data() {

    const config = useConfig()
    return {
      email: null,
      config,
      password: null,
      type: "password",
      errors: {
        email: {
          error: false,
          errorText: null
        }
      }
    }
  },
  methods: {
    testEmail(val) {
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!regex.test(val)) {
        this.errors.email = {
          error: true,
          errorText: "Por Favor um email válido"
        }
      }
      else {
        this.errors.email = {
          error: false,
          errorText: null
        }
      }
    },
    async sendEmail() {
      this.config.loading = true
      this.testEmail(this.email);
      if (!this.errors.email.error) {
        const res = await resetPassword(this.email);
        
        if (res.success) {
          Swal.fire({
            icon: "success",
            title: "Atenção",
            text: "Se o email digitado estiver em nossa base de dados: "+ res.message
          }).then(() => {
            this.$router.push("/login")
          })
        } else {
          let message = ", por favor verifique o email digitado."
          Swal.fire({
            icon: "error",
            title: "Atenção",
            text: "Não foi possivel enviar o email de recuperação "
          })
        }
      }
      this.config.loading = false
    }
  }
}
</script>

<style lang="scss" scoped></style>@/firebase/firebase@/firebase/firebase