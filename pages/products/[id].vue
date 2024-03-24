<template>
  <div>
    <h2>product id: {{ route.params.id }}</h2>
    {{ route.params }}
  </div>
</template>

<script setup>
const route = useRoute()
definePageMeta({
  layout: "main"
})
</script >
<style>

</style>