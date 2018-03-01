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
          <td>{{ form.carbohydrate | fixedone }}</td>
          <td>{{ form.calories | fixedone }}</td>
          <td>
              <button class="btn btn-outline-success btn-block btn-sm flex-item" @click="add">Добавить</button>
          </td>
        </tr>
        <basket-items-table-item v-for="item in items" :key="item.productId" :basketItem="item" @drop="drop" @sync="syncItem" />
      </tbody>
    </table>
  </div>
</template>

<script>
// import { copyValue } from '@/helpers/helper'
import BasketItemsTableItemVue from './BasketItemsTableItem.vue'
export default {
  name: 'BasketItemsTable',
  props: ['basektItems'],
  data () {
    return {
      form: { productId: null, weight: null, protein: '', fat: '', carbohydrate: '', calories: '', hash: null },
      items: []
    }
  },
  watch: {
    'isFormChanged' (to, from) {
      let need = this.formProduct && this.form.weight
      this.form.protein = need ? this.formProduct.protein * this.form.weight / 100 : 0
      this.form.fat = need ? this.formProduct.fat * this.form.weight / 100 : 0
      this.form.carbohydrate = need ? this.formProduct.carbohydrate * this.form.weight / 100 : 0
      this.form.calories = need ? this.formProduct.calories * this.form.weight / 100 : 0
    },
    // 'items' (to, from) {
    //   this.$emit('syncItems', to)
    // },
    'stageItems' (to, from) {
      if (!this.items || this.items.length === 0) {
        this.items = to
      }
    }
  },
  created () {
    this.items = this.stageItems
  },
  computed: {
    stageItems () {
      return this.basektItems
    },
    isFormChanged () {
      return this.form.productId + this.form.weight
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
      let product = this.items.find((el) => el.productId === this.form.productId)
      if (!product) {
        this.items.push({ hash: this.$store.getters.getHash, productId: this.form.productId, weight: this.form.weight })
      } else {
        product.weight = parseInt(product.weight) + parseInt(this.form.weight)
      }
      this.form = { productId: null, weight: null, protein: '-', fat: '-', carbohydrate: '-', calories: '-', hash: null }
    },
    drop (item) {
      this.items.splice(this.items.indexOf(item), 1)
    },
    syncItem (item) {
      this.items.splice(this.items.indexOf(this.items.find((el) => el.hash === item.hash)), 1, item)
      this.$emit('syncItems', this.items)
    }
  },
  components: {
    basketItemsTableItem: BasketItemsTableItemVue
  }
}
</script>

<style scoped>
</style>
