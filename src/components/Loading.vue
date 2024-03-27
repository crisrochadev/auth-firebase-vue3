<template>
  <div class="w-screen h-screen flex justify-center items-center top-0 left-0 fixed bg-[rgba(0,0,0,.25)]">
    <div class="relative flex justify-center items-center">
      <div class="loader absolute border-4 border-t-cyan-600 border-l-blue-600 border-r-purple-600 border-b-pink-600 w-12 h-12">

      </div>
      <div class="loader-2 flex justify-center items-center border-8 border-t-cyan-600 border-l-blue-600 border-r-purple-600 border-b-pink-600 w-10 h-10">
        <div class="w-full h-full bg-gray-600 block rounded-full">
          <!-- <span class="w-8 h-8 bg-cyan-600 animate-ping block rounded-full"></span> -->
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  setup() {


    return {}
  }
}
</script>

<style scoped>
.loader {
  margin: auto;
  border-radius: 100%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: spinner 1s linear infinite;
}

.loader-2 {
  margin: auto;
  border-radius: 50%;
  animation: spinner-2 2s linear infinite;
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes spinner-2 {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(-360deg);
  }
}
</style>