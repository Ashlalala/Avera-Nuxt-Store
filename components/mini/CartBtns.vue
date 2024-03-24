<template>
<div class="gap-1 flex">
  <button v-if="!productInCart" @click.prevent="addToCart" class="border border-black hover:bg-green-500 p-2
  transition-all">
    <Icon name="ic:baseline-add-shopping-cart" size="15"/>Add to Cart
  </button>

  <template v-if="productInCart">
    <button  @click.prevent="addToCart" class="transition-all">
      <!-- The Add Button -->
      <Icon name="ic:baseline-add-circle" size="30" color="green" class="rounded-full hover:bg-black"/>
    </button>
    <span class="text-2xl">{{ productInCart.quantity }}</span>
    <button @click.prevent="tryRemoveFromCart">
      <!-- The Remove Button -->
      <Icon name="ic:baseline-remove-circle" size="30" color="red" class="rounded-full hover:bg-black"/> 
  </button>
  </template>


  <div v-if="isConfirmRemoveFromCart" @click.prevent="isConfirmRemoveFromCart=false" class="z-45 fixed left-0 
  right-0 bottom-0 top-0 bg-black bg-opacity-15 flex justify-center items-center">
    <div class="h-[20vh] bg-yellow-200 relative flex justify-center z-46 p-2 border border-black border-2 w-[70vw]">
      <h2>Are you sure you want to remove <b>{{ product.name }}</b> from Cart?</h2>
      <div class="absolute bottom-2 z-47">
        <button @click.prevent="removeFromCart"class="bg-green-100 border border-black border-2
        mr-1 p-2 hover:bg-green-300">Yes</button>
        <button @click.prevent="isConfirmRemoveFromCart=false" class="bg-red-100 border border-black border-2
        ml-1 p-2 hover:bg-red-300">No</button>
      </div>
    </div>
  </div>

  <div v-if="isConfirmClearCartForBundle" @click.prevent="isConfirmClearCartForBundle=false" class="z-45 fixed left-0 
  right-0 bottom-0 top-0 bg-black bg-opacity-15 flex justify-center items-center">
    <div class="h-[20vh] bg-yellow-200 relative flex justify-center z-46 p-2 border border-black border-2 w-[70vw]">
      <h2 >We see that you have products in you Cart. This is a bundle-deal that will empty you cart to fill it with 
      the bundle products. Are you sure you want to precede?</h2>
      <div class="absolute bottom-2 z-47">
        <button @click.prevent="addToCartBundle"class="bg-green-100 border border-black border-2
        mr-1 p-2 hover:bg-green-300">Yes</button>
        <button @click.prevent="isConfirmClearCartForBundle=false" class="bg-red-100 border border-black border-2
        ml-1 p-2 hover:bg-red-300">No</button>
      </div>
    </div>
  </div>
</div>    
</template>

<script setup>
import { useUserStore } from '~/stores/user';
const userStore = useUserStore()
const props = defineProps({
  // productInCart:{
  //   type: Object,
  //   required: false
  // },
  product:{
    type: Object,
    required: true,
  },
  isBundle: {
    type: Boolean,
    required: false,
  }
})

const emit = defineEmits(['justRemoved'])

const productInCart = computed(() => {
  if(props.isBundle) return null
  let ans = null
  for(let i=0;i<userStore.cart.length;i++){
    if(userStore.cart[i] && userStore.cart[i].id==props.product.id){
      ans = userStore.cart[i]
      return ans
    } 
  }
  return ans
})

const isConfirmClearCartForBundle = ref(false)
const isConfirmRemoveFromCart = ref(false)


function addToCart(){
  if(props.isBundle){
    tryAddToCartBundle()
    return
  }
  userStore.addToCart(props.product.id)
}

function tryRemoveFromCart(){
  if(productInCart.value.quantity==1){
    isConfirmRemoveFromCart.value = true
  } else {
    removeFromCart()
  }
}

function removeFromCart() {
  isConfirmRemoveFromCart.value=false
  if(productInCart.value.quantity==1) emit('justRemoved', true)
  userStore.removeFromCart(props.product.id)
}

function tryAddToCartBundle(){
  if(userStore.cart.length){
    isConfirmClearCartForBundle.value = true
    return
  }
  addToCartBundle()
}

function addToCartBundle(){
  userStore.clearCart()
  console.log(props.product.name)
  props.product.ids.forEach(id => {
    const newCartItem = {
      id: id,
      quantity: 1,
    }
    userStore.cart.push(newCartItem)
  })
}

</script>

<style>

</style>