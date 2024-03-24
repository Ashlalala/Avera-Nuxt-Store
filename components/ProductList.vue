<template>
<div class="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sd:grid-cols-3 grid-cols-2 gap-4 p-4
overflow-auto">
  <!-- <div v-for="obj in cartAndProducts" :key="obj.product.id"> -->
    <!-- <ProductItem :productInCart="obj.productInCart" :product="obj.product"/> -->
    
  <div v-for="product in products" :key="product.id">
    <ProductItem :product="product" @seeMoreBundle="seeMoreBundle" :isBundle="isBundle" 
    :isSeeMoreBundle="isSeeMoreBundle"/>
    <!-- Make so that the listener is only on bundle and not on product items  -->
  </div>
</div>

</template>
<script setup>
const props = defineProps({
  // cartAndProducts: {
  //   type: Array,
  //   required: true,
  // },
  products: {
    type: Array,
    required: true,
  },
  isBundle: {
    type: Boolean,
    required: true,
  },
  isSeeMoreBundle: {
    type: Boolean,
    required: false,
  },
})

const emit = defineEmits(['seeMoreBundle'])

function seeMoreBundle(bundle){
  emit('seeMoreBundle', bundle)
}

</script>


<style>

</style>