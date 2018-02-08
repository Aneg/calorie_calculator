<template>
  <div>
    <h2>Дневной рацион</h2>
    <div class="table-center">
      <table>
        <caption>
        </caption>
        <tr>    
          <th>Белки</th>
          <th>Жиры</th>
          <th>Углеводы</th>
          <th>Калории</th>
        </tr>
        <tr>
          <td>{{ protein | fixedone }}</td>
          <td>{{ fat | fixedone }}</td>
          <td>{{ carbohydrate | fixedone }}</td>
          <td>{{ calculus | fixedone }}</td>
        </tr>
      </table>
    </div>
    <button class='button button-green' @click="addBasket">Добавить блок</button>
    <div>
      <div class="baskets" v-for="(basket) in baskets" :key='basket.id'>
        <Basket :products="products" :old_basket="basket" @dropOrupdateBasket='dropOrupdateBasket'></Basket>
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
  computed: {
    protein () {
      return this.getCount('protein')
    },
    carbohydrate () {
      return this.getCount('carbohydrate')
    },
    fat () {
      return this.getCount('fat')
    },
    calculus () {
      return this.getCount('calculus')
    },
    products () {
      return this.$store.getters.products;
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
      this.baskets.push({list: []})
    },
    dropOrupdateBasket (id, basket = null) {
      dropOrUpdateObjectById(this.baskets, id, basket)
      this.$store.dispatch('saveBaskets', this.baskets)
      this.baskets = copyValue(this.$store.getters.baskets)
    },
    getCount (name) {
      var total = 0
      this.$store.getters.baskets.forEach((el) => {
        el.list.forEach((el) => {
          total += this.$store.getters.product(el.product_id)[name] * el.weight / 100
        })
      })
      return total
    }
  }
}
</script>

<style scoped>
.table-center {
  text-align: center;
}
.calculator {
  margin: 0 10%;
}
.baskets {
  margin: 0;
  padding: 0;
}
</style>
