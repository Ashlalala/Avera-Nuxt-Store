import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    isMenuOverlay: false,
    isLoading: false,
    cart: [],
    checkout: [],
  }),
  actions: {
    clearCart(){
      this.cart = []
    },
    addToCart(id){
      let isInCart
      this.cart.map(item => {
        if(item.id == id){
          isInCart = true
          item.quantity ++
          return
        }
      })
      if(!isInCart){
        const newCartItem = {
          id: id,
          quantity: 1
        }
        this.cart.push(newCartItem)
      }
    },
    removeFromCart(id){
      this.cart.forEach((item, index) => {
        if(item.id == id){
          if(item.quantity <= 1) this.cart.splice(index, 1)
          else item.quantity --
        }
      });
    }
  },
  persist: true
})