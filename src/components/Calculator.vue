<template>
  <div class="calculator">
    <h2>Дневной рацион</h2>
    <button class='button button-green' @click="addBasket">Добавить блок</button>
    <div>
      <div class="baskets" v-for="(basket, i) in baskets" :key='basket.id'>
        <Basket :products="$store.getters.products" :old_basket="basket" @dropOrupdateBasket='dropOrupdateBasket'></Basket>
      </div>
    </div>
  </div>
</template>

<script>
import Basket from '@/components/Basket.vue'
import { copyValue, dropOrUpdateObjectById } from '@/helpers/helper'
export default {
  data () {
    return {
      baskets: []
    }
  },
  components: {
    Basket
  },
  created () {
    this.baskets = copyValue(this.$store.getters.baskets)
  },
  methods: {
    addBasket () {
      console.log(this.baskets)
      // let e = {list: []}
      this.baskets.unshift({list: []})
      // this.$set(this.baskets[0], 'list', [])
      console.log(this.baskets)
    },
    dropOrupdateBasket (id, basket = null) {
      dropOrUpdateObjectById(this.baskets, id, basket)
      this.$store.dispatch('saveBaskets', this.baskets)
      this.baskets = copyValue(this.$store.getters.baskets)
    }
  }
}
</script>

<style scoped>
.calculator {
  margin: 0 10%;
}
.baskets {
  margin: 0;
  padding: 0;

}
</style>
