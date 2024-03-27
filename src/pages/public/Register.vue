<template>
  <div class="w-full h-full flex justify-center items-center">
    <card>
      <div class="w-full flex items-center gap-2 mb-8 justify-center">

        <h2 class="text-4xl  text-cyan-600  font-extrabold">Cadastrar</h2>
      </div>
      <TextInput @input="testName" placeholder="Nome Completo" v-model:model="fullName" :error="errors.fullName.error"
        :errorText="errors.fullName.errorText" />
      <TextInput @input="testEmail" placeholder="Email" v-model:model="email" :error="errors.email.error"
        :errorText="errors.email.errorText" />
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

      <Btn class="p-2 mt-8 w-full" @click="register">
        Cadastrar
      </Btn>
      <SociaisButton v-model:session="session" :methods="['facebook', 'google']" />

      <p class="flex mt-8 items-center justify-center gap-2">Já tem cadastro? <router-link to="/login"
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
import { registerEmail } from "@/firebase"
import Swal from 'sweetalert2'
export default {
  components: { Card, TextInput, Btn, SociaisButton },
  data() {
    const store = useAuth()
    const config = useConfig()
    return {
      store,
      config,
      email: null,
      password: null,
      type: "password",
      password_confirm: null,
      fullName: null,
      errors: {
        email: {
          error: false,
          errorText: null
        },
        password: {
          error: false,
          errorText: null
        },
        password_confirm: {
          error: false,
          errorText: null
        },
        fullName: {
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
    testName(val) {
      const regex = /^[a-zA-Z]+(?:\s+[a-zA-Z]+)+$/;
      if (!regex.test(val)) {
        this.errors.fullName = {
          error: true,
          errorText: "Por Favor digite o nome completo"
        }
      }
      else {
        this.errors.fullName = {
          error: false,
          errorText: null
        }
      }
    },
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
    async registerUser() {
      const res = await registerEmail(this.email, this.password)
      if (res.success) {
    
        
        this.store.session = {
          ...res.user,
          accessToken: res.user.accessToken
        }
      } else {
        console.error(res)
        let message = res.error.code.includes("auth/email-already-in-use") ? 'Email já cadastrado' : 'Não foi possivel cadastrar, tente mais tarde'
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: message
        }).then(() => {
          if(message.includes('Email já cadastrado')){
            this.$router.push('/login')
          }
        })
      }
    },
    async register() {
      this.config.loading = true
      this.testName(this.fullName);
      this.testEmail(this.email);
      this.testPassword(this.password);
      this.testPasswordConfirm(this.password_confirm);
      let dontError = [];
      Object.values(this.errors).forEach(val => {
        dontError = [...dontError, ...Object.values(val)]
      });

      if (dontError.every(val => !val)) {
        await this.registerUser()
      }
      this.config.loading = false
    }
  }

}
</script>

<style lang="scss" scoped></style>@/firebase/firebase@/firebase/firebase