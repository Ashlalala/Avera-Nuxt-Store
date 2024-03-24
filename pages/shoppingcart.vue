<template>
  <div class="p-4">
    <div v-if="!isLoggedIn" class="text-center">
      <h6 class="mb-[80px]">You need to be logged in to access the shopingcart</h6>
      
      <NuxtLink to="/login" class="border border-black border-[5px]">Logg in</NuxtLink>
    </div>

    <div v-else class="">
      <h2 class="text-xl mb-[40px] text-center">Shopping Cart ({{ cart.length }})</h2>
      <div v-if="!cart.length" class="text-center">
        <h6 class="mb-[40px]">Your shopping cart is empty</h6>
        <NuxtLink to="/" class="border border-black border-[5px] text-xl p-2 bg-green-100
        hover:bg-green-300">Shop</NuxtLink>
      </div>
      <template v-else >
        <CartItem v-for="obj in cartAndProducts" :productInCart="obj.productInCart" :product="obj.product" />
        <div class="border border-2 border-black border-top-1 w-full mt-1 p-1">
          <h2 v-if="bundleDeal">Old total: <b>{{ totalPrice }} c.</b>
            <br>
            <span class="text-red-500">New Total: <b>{{ totalPrice*(100-bundleDeal)/100 }} c.</b> 
              ({{ bundleDeal }}% discount)
          </span></h2>
          <h2 v-else class="text-gray-500">Total: <b>{{ totalPrice }} c.</b></h2>
          <button @click="userStore.clearCart()">Clear Cart</button>
        </div>   
      </template>
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

const {cart} = toRefs(userStore)

const response = ref({})

response.value = (await axios.get('https://korgar.tj/avera-api/priceslist?key=sd34lfkjsdklf@1234234DKFJS634DK@*$%5Evmklsdfjlks234df')).data.data


// const cartAndProducts = ref([])
// userStore.cart.forEach(productInCart => {
//   response.value.pricelist.forEach(product => {
//     if(product.id == productInCart.id){
//       cartAndProducts.push({
//         productInCart: productInCart, 
//         product: product
//       })
//     }
//   })
// })


const bundleDeal = computed(() => {
  let cartIds = []
  cart.value.forEach(product =>{
    cartIds.push(product.id)
  })
  let ans = false
//use filter here
  response.value.bundles.forEach(bundle => {
    if( areEqual(cartIds,bundle.ids) ) ans = bundle.discount 
  })
  return ans
})


const cartAndProducts = computed(() => {
  let ans=[]
  userStore.cart.forEach(productInCart => {
    response.value.pricelist.forEach(product => {
      if(product.id == productInCart.id){
        ans.push({
          productInCart: productInCart, 
          product: product
        })
      }
    })
  })
  return ans
})

// console.log(cartAndProducts.value)

const totalPrice = computed(() =>{
  let total = 0
  cartAndProducts.value.forEach(obj => {
    total += obj.product.price*obj.productInCart.quantity
  });
  return total
})

const isLoggedIn = true;


function areEqual(arr1, arr2)
    {
        let N = arr1.length;
        let M = arr2.length;
 
        // If lengths of array are not equal means
        // array are not equal
        if (N != M)
            return false;
 
        // Sort both arrays
        let arr11=arr1
        let arr22=arr2

        arr11.sort();
        arr22.sort();
 
        // Linearly compare elements
        for (let i = 0; i < N; i++)
            if (arr11[i] != arr22[i])
                return false;
 
        // If all elements were same.
        return true;
    }

</script>

<style>
</style>