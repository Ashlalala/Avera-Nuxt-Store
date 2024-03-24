<template>
<div id="IndexPage" class="max-w-[1200px] mx-auto px-4 bg-gray-60">
  <div id="Products">
    <h2 class="text-center text-3xl font-bold py-5">Products</h2>
    <h2 v-if="!response.pricelist" class="text-center text-xl font-bold">Sorry, no products available.</h2>    
    <ProductList v-else :products="response.pricelist" :isBundle="false"/>
  </div>
  <hr>
  <div id="Bundles">
  <h2 class="text-center text-3xl font-bold py-5">Bundles</h2>
    <h2 v-if="!response.pricelist" class="text-center text-xl font-bold">Sorry, no bundles available.</h2>
    <ProductList :products="response.bundles" :isBundle="true" @seeMoreBundle="seeMoreBundle"
    :isSeeMoreBundle="false"/>
  </div>
  <hr>
  
  <div v-if="isSeeMoreBundle" @click.prevent="isSeeMoreBundle=false" class="z-45 fixed left-0 
  right-0 bottom-0 top-0 bg-black bg-opacity-5 flex justify-center items-center">
    <div @click.stop class="fixed bottom-0 left-5 right-5 h-[66vh] bg-gray-900 rounded flex items-center
    border border-black border-2 bg-opacity-90 flex-col">
      <h2 class="text-center text-2xl font-bold text-white">{{ bundle.name }}</h2>
      <ProductList :products="bundle.products" :isBundle="false" :isSeeMoreBundle="true"/>
      <button @click.prevent="isSeeMoreBundle=false" class="absolute bg-gray-100 -top-14 rounded-full hover:bg-black">
        <Icon name="material-symbols:keyboard-double-arrow-down-rounded" size="50" class="hover:text-white"/>
      </button>
    </div>
  </div>    
</div>
</template>

<script setup>
import { useUserStore } from '~/stores/user'
import axios from 'axios';

definePageMeta({
  layout: "main"
})

const userStore = useUserStore()


const isSeeMoreBundle = ref(false) 

const response = ref({})


response.value = (await axios.get('https://korgar.tj/avera-api/priceslist?key=sd34lfkjsdklf@1234234DKFJS634DK@*$%5Evmklsdfjlks234df')).data.data

const bundle = ref({
  name: '',
  products: [],
})


// optimize arr search by removing matches from the search arr (props.products) do same in index.js
function seeMoreBundle(emittedBundle){
  emittedBundle.ids.forEach(id => {
    response.value.pricelist.forEach(product => {
      if(product.id == id) bundle.value.products.push(product)
    })
  })
  bundle.value.name = emittedBundle.name
  isSeeMoreBundle.value = true;
}


// dont wait for this function to complete to load the page, rather show a loading icon on the bundle price.
onMounted(() => {
  response.value.bundles.forEach(bundle => {
    bundle.ids.forEach(id => {
      response.value.pricelist.forEach(product => {
        if(id == product.id){
          if(bundle.price) bundle.price += product.price
          else bundle.price = product.price
          return
        }
      })
    })
  })
})































// userStore.cart.forEach(productInCart => {
//   response.value.pricelist.forEach(product => {
//     if(product.id == productInCart.id){
//       cartAndProducts.value.push({
//         productInCart: productInCart, 
//         product: product
//       })
//     } else {
//       cartAndProducts.value.push({
//         product: product
//       })
//     }
//   })
// });

</script>
