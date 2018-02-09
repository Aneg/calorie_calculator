<template>
  <div class="basket">
    <hr>
    <table border="1">
      <caption>
        <button class='button button-blue' @click="save">Сохранить</button>
        <button class='button button-gray' @click="revert">Восстановить</button>
        <button class='button button-red delete' @click="drop">Удалить </button>
      </caption>
      <tr>
        <th>Название</th>
        <th>Вес</th>
        <th>Действия</th>
        <th>Белки</th>
        <th>Жиры</th>
        <th>Углеводы</th>
        <th>Калории</th>
      </tr>
      <tr>
        <td>
          <select class="styled-select green rounded" v-model="form.product_id">
            <option disabled value="">Выберите продукт</option>
            <option v-for='product in products' :value="product.id" :key="product.id">{{product.name}}</option>
          </select>
        <td><input placeholder="Вес" v-model.number="form.weight"></td>
        <td><button class='button button-green' @click="addToBasket">+</button></td>
        <td>{{ protein | fixedone }}</td>
        <td>{{ fat | fixedone }}</td>
        <td>{{ carbohydrate | fixedone }}</td>
        <td>{{ calculus | fixedone }}</td>
      </tr>
      <basket-item v-for="(product, i) in basket.list"
        :product="getCountItem(product)"
        :oldWeight="product.weight"
        :key="i"
        :keyItem="i"
         @drop='dropItem'
         @save='saveItem'/>
    </table>
  </div>
</template>

<script>
import { copyValue } from '@/helpers/helper'
import BasketItem from '@/components/BasketItem.vue'
export default {
  props: {
    products: Array,
    old_basket: Object
  },
  components: {
    basketItem: BasketItem
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
    }
  },
  data () {
    return {
      form: { product_id: '', weight: '' },
      basket: []
    }
  },
  beforeMount () {
    this.revert()
  },
  methods: {
    // TODO: перенести в computed
    getCountItem (product) {
      return this.$store.getters.totalCount(product.product_id, product.weight)
    },
    getProductById (id) {
      return this.$store.getters.product(id)
    },
    getCount (name) {
      var protein = 0
      this.basket.list.forEach((item) => {
        // TODO: выводить ошибку, если продукт не найден.
        protein += this.$store.getters.totalCountByName(item.product_id, name, item.weight)
      })
      return protein
    },
    //
    addToBasket () {
      this.basket.list.unshift({
        product_id: this.form.product_id,
        weight: this.form.weight,
        name: this.getProductById(this.form.product_id).name })
      // debugger
      this.form = { product_id: '', weight: '' }
    },
    dropItem (key) {
      this.basket.list.splice(key, 1)
    },
    saveItem (data) {
      this.basket.list[data.key].weight = data.weight
    },
    drop () {
      this.$emit('dropOrupdateBasket', this.basket.id)
    },
    save () {
      this.$emit('dropOrupdateBasket', this.basket.id, this.basket)
    },
    revert () {
      this.basket = copyValue(this.old_basket)
    }
  }
}
</script>

<style scoped>
.delete {
  align-self: left
}
.basket {
  margin: 0;
  padding: 0;
}
table {
  width: 100%;
}
  .styled-select {
   height: 29px;
   overflow: hidden;
   width: 240px;
}
.styled-select select {
   background: transparent;
   border: none;
   font-size: 14px;
   height: 29px;
   padding: 5px; /* If you add too much padding here, the options won't show in IE */
   width: 268px;
}
.styled-select.slate {
   background: url(http://i62.tinypic.com/2e3ybe1.jpg) no-repeat right center;
   height: 34px;
   width: 240px;
}
.styled-select.slate select {
   border: 1px solid #ccc;
   font-size: 16px;
   height: 34px;
   width: 268px;
}
.rounded {
   -webkit-border-radius: 20px;
   -moz-border-radius: 20px;
   border-radius: 20px;
}
.slate   { background-color: #ddd; }
.slate select   { color: #000; }
.green   { background-color: #ddd; }
.half {
  vertical-align: top;
  width: 49%;
  margin: 10px 0;
  display: inline-block;
}
</style>
