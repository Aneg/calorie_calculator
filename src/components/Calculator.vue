<template>
  <div class="calculator">
    <h2>Дневной рацион</h2>
    <button class='button button-green' @click="addBasket">Добавить блок</button>
    <div>
      <div class="baskets" v-for="basket in baskets">
        <Basket :products="products" :old_basket="basket" @dropOrupdateBasket='dropOrupdateBasket'></Basket>
      </div>
    </div>
  </div>
</template>

<script>
import Basket from '@/components/Basket.vue';
import { dropOrUpdateObjectById } from '@/helpers/helper'
import generateId from '@/mixins/generateId.vue'
export default {
  mixins: [generateId],
  props: {
    products: Array,
  },
  data () {
    return {
      baskets: [],
    }
  },
  components: {
    Basket
  },
  methods: {
    addBasket() { 
      return this.baskets.unshift({id: this.generateNextId(), list: []})
    },
    dropOrupdateBasket(id, basket = null) { 
      dropOrUpdateObjectById(this.baskets, id, basket) 
    },
  }
}
</script>

<style scoped>
.calculator {
  margin: 0 10%;
}
.baskets {
  /*vertical-align: top;
  width: 50%;*/
  margin: 0;
  padding: 0;
  /*display: inline-block;*/
}
</style>