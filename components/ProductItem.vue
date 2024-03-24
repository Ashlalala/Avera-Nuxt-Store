<template>    
<div class="bg-white cursor-pointer inline-block rounded hover:shadow-[0_15px_100px_40px_rgba(0,0,0,0.3)] p-4">
  <NuxtLink :to="(isBundle ? '/bundles/' : '/products/') + product.id">
    <h2 class="text-center font-bold text-l mb-2">{{ product.name }}</h2>
    <p class="mb-2">{{ product.description }}</p>

    <h5 v-if="!isBundle" class="mb-2"><b>{{ product.price }} c.</b></h5>
    <template v-else>
      <h5 v-if="product.price" class="mb-2"><b>{{product.price}} c.</b></h5>
      <Icon v-else name="eos-icons:loading" size="20"></Icon>
    </template>


    <p class="text-gray-600 mb-2">{{ product.category }}</p>
    <!-- Add a nuxtlink to a search by category -->
  </NuxtLink>
    <template v-if="!isSeeMoreBundle">      
      <MiniCartBtns :product="product" :isBundle="isBundle" class="mt-2"/>
      <button v-if="product.ids" @click="emit('seeMoreBundle', product)"
      class="border border-black border-1 bg-yellow-200 p-2 hover:bg-yellow-900 mt-2">See Full List</button>
    </template>
</div>
</template>

 <script setup>
const props = defineProps({
  productInCart: {
    type: Object,
    required: false,
  },
  product: {
    type: Object,
    required: true,
  },
  isBundle: {
    type: Boolean,
    required: false,
  },
  isSeeMoreBundle: {
    type: Boolean,
    required: false,
  }
})

const emit = defineEmits(['seeMoreBundle'])

const {product} = toRefs(props)


 </script>