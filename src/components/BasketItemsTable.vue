<template>
<div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Продукт</th>
          <th scope="col">Вес</th>
          <th scope="col">Белки</th>
          <th scope="col">Жиры</th>
          <th scope="col">Углеводы</th>
          <th scope="col">Калорийность</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <select v-model="form.productId" class="form-control">
              <option value=""></option>
              <option v-for="product in products" :key="product.hash" :value="product.id">{{ product.name }}</option>
            </select>
          </td>
          <td>
            <input v-model.number="form.weight" class="form-control" type="number">
          </td>
          <td>{{ form.protein | fixedone }}</td>
          <td>{{ form.fat | fixedone }}</td>
          <td>{{ form.carbohydrate | fixedone}}</td>
          <td>{{ form.calories | fixedone }}</td>
          <td>
              <button class="btn btn-outline-success btn-block btn-sm flex-item" @click="add">Добавить</button>
          </td>
        </tr>
        <basket-items-table-item v-for="item in basketItems" :key="item.hash" :basketItem="item"/>
      </tbody>
    </table>
  </div>
</template>

<script>
import { copyValue } from '@/helpers/helper'
import BasketItemsTableItemVue from './BasketItemsTableItem.vue'
export default {
  name: 'BasketItemsTable',
  data () {
    return {
      form: { productId: null, weight: null, protein: '-', fat: '-', carbohydrate: '-', calories: '-', hash: null },
      basketItems: []
    }
  },
  watch: {
    'isFormChanged' (to, from) {
      // let product = this.formProduct.find((el) => {parseInt(el.id) === parseInt(to)})
      let need = this.formProduct && this.form.weight
      this.form.protein = need ? this.formProduct.protein * this.form.weight / 100 : '-'
      this.form.fat = need ? this.formProduct.fat * this.form.weight / 100 : '-'
      this.form.carbohydrate = need ? this.formProduct.carbohydrate * this.form.weight / 100 : '-'
      this.form.calories = need ? this.formProduct.calories * this.form.weight / 100 : '-'
    }
  },
  computed: {
    isFormChanged () {
      return this.form.productId + this.form.weight
    },
    basketProdukts () {
      return []
    },
    products () {
      return this.$store.getters.products
    },
    formProduct () {
      return this.products.find((el) => parseInt(el.id) === parseInt(this.form.productId))
    }
  },
  methods: {
    add () {
      this.form.hash = this.$store.getters.getHash
      this.form.name = this.formProduct.name
      this.basketItems.push(copyValue(this.form))
      this.form = { productId: null, weight: null, protein: '-', fat: '-', carbohydrate: '-', calories: '-', hash: null }
    }
  },
  components: {
    basketItemsTableItem: BasketItemsTableItemVue
  }
}
</script>

<style scoped>
</style>
