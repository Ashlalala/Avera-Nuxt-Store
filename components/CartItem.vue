<template>
  <div class="flex flex-col border border-black border-5 p-2 rounded gap-2">
    <div class="flex justify-between">
      <div class="">{{ product.name }}</div>
      <div class=""><b>{{ product.price }} c.</b></div>
    </div>
    <p>{{ product.description }}</p>
    <div class="flex justify-between">
      <MiniCartBtns :product="product" :productInCart="productInCart"/>
        <span><b>{{product.price}} c. 
          <Icon name="emojione-monotone:heavy-multiplication-x" size="10" color="gray"/> 
          {{productInCart.quantity}} 
          <Icon name="material-symbols:equal-rounded" size="18" color="gray"/>
          {{product.price*productInCart.quantity}} c.</b>
        </span>
    </div>
    <!-- @justRemoved="justRemoved=true" -->
  </div>
</template>
<script setup>
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()

const props = defineProps({
  productInCart:{
    type: Object,
    required: true,
  },
  product:{
    type: Object,
    required: true,
  }
})


let justRemoved = ref(false)

</script>

<style>

</style>