<template>
  <div class="calculator">
    <h2>Дневной рацион</h2>
    <button class='button button-green' @click="addBasket">Добавить блок</button>
    <div>
      <div class="baskets" v-for="basket in baskets" :key=basket.id>
        <Basket :products="$store.getters.products" :old_basket="basket" @dropOrupdateBasket='dropOrupdateBasket'></Basket>
      </div>
    </div>
  </div>
</template>

<script>
import Basket from '@/components/Basket.vue';
import { copyValue, dropOrUpdateObjectById } from '@/helpers/helper';
import generateId from '@/mixins/generateId.vue';

export default {
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
      this.baskets.push({list: []})
    },
    dropOrupdateBasket(id, basket = null) { 
      dropOrUpdateObjectById(this.baskets, id, basket) 
      this.$store.dispatch('saveBaskets', this.baskets);
      this.baskets = copyValue(this.$store.getters.baskets);
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