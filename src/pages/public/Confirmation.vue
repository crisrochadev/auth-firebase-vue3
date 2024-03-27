<template>
  <div class="w-full h-full flex justify-center items-center">
    <card>
      <div class="w-full flex items-center gap-2 mb-8 justify-center">

        <h2 class="text-4xl  text-cyan-600  font-extrabold">Nova Senha</h2>
      </div>
      <TextInput @input="val => testPassword(val), testPasswordConfirm(password_confirm)" placeholder="Senha"
        v-model:model="password" :type="type" after="true" :error="errors.password.error"
        :errorText="errors.password.errorText">
        <template #after>
          <button @click="type = type == 'password' ? 'text' : 'password'"
            class="material-icons-outlined text-cyan-600">{{ type == 'password' ? 'visibility_off' : 'visibility'
            }}</button>
        </template>
      </TextInput>
      <TextInput @input="testPasswordConfirm" placeholder="Confirmar Senha" v-model:model="password_confirm"
        :type="type" after="true" :error="errors.password_confirm.error" :errorText="errors.password_confirm.errorText">
        <template #after>
          <button @click="type = type == 'password' ? 'text' : 'password'"
            class="material-icons-outlined text-cyan-600">{{ type == 'password' ? 'visibility_off' : 'visibility'
            }}</button>
        </template>
      </TextInput>

      <Btn class="p-2 mt-8 w-full" @click="recover">
        Cadastrar
      </Btn>

      <p class="flex mt-8 items-center justify-center gap-2">Lembrou a senha? <router-link to="/login"
          class=" text-cyan-600 font-bold ">Entrar</router-link>
      </p>
    </card>
  </div>
</template>

<script>
import Card from '@/components/Card'
import SociaisButton from '@/components/SociaisButton'
import Btn from '@/components/Btn'
import TextInput from '@/components/TextInput'
import { useAuth } from '@/stores/auth'
import { useConfig } from '@/stores/config'
import { confirmation } from "@/firebase"
import Swal from 'sweetalert2'
export default {
  components: { Card, TextInput, Btn, SociaisButton },
  data() {
    const store = useAuth()
    const config = useConfig()
    return {
      store,
      config,
      password: null,
      type: "password",
      password_confirm: null,
      errors: {
        password: {
          error: false,
          errorText: null
        },
        password_confirm: {
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
  methods: {
    testPassword(val) {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,40}$/;
      if (!regex.test(val)) {
        this.errors.password = {
          error: true,
          errorText: "Sua senha precisa ter ao menos uma letra maiúscula, uma letra minúcula, um número e enrtre 6 e 40 caracteres."
        }
      }
      else {
        this.errors.password = {
          error: false,
          errorText: null
        }
      }
    },
    testPasswordConfirm(val) {
      if (val !== this.password) {
        this.errors.password_confirm = {
          error: true,
          errorText: "As senhas não são iguais"
        }
      }
      else {
        this.errors.password_confirm = {
          error: false,
          errorText: null
        }
      }
    },
    
    async recover() {
      this.config.loading = true
     
      this.testPassword(this.password);
      this.testPasswordConfirm(this.password_confirm);
      if(!this.errors.password.error && !this.errors.password_confirm.error){
        const res = await confirmation(this.$route.query,{password:this.password})
        if(res.success){
          Swal.fire({
            icons:"success",
            title:"Atenção",
            text:res.message
          }).then(() => {
            this.$router.push("/login")
          })
        }else{
          Swal.fire({
            icons:"error",
            title:"Atenção",
            text:"Link inválido ou expirado"
          }).then(() => {
            this.$router.push("/reset")
          })
        }
      }
      this.config.loading = false
    }
  }

}
</script>

<style lang="scss" scoped></style>@/firebase/firebase@/firebase/firebase@/firebase/firebase