<template>
  <div class="basket">
    <div class="loading" v-if="loading">
      Загрузка...
    </div>
    <h2 v-if="basket">
      {{ basketId ? 'Редактирование ' + basket.name : 'Добавленеие продукта' }}
      <button
        type="submit"
        @click="save"
        class="btn btn-primary btn-sm float-right"
      >
        Сохранить изменения
      </button>
      </h2>
    <hr/>
    <form v-if="basket" @submit.prevent="save">
      <div class="form-group row">
          <div class="col-sm-12">
            <div class="form-group">
              <input
                v-model.number='basket.name'
                class="form-control"
                placeholder="Название"
                :disabled="disableSubmit"
              >
            </div>
          </div>
          <div v-if="!basketId" class="col-sm-12">
            <button type="submit" class="btn btn-primary">Сохранить</button>
          </div>
      </div>
    </form>
    <table v-if="basket" class="table">
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
            <input :disabled="!formProduct" v-model.number="form.weight" class="form-control" type="number">
          </td>
          <td>{{ form.protein | fixedone }}</td>
          <td>{{ form.fat | fixedone }}</td>
          <td>{{ form.carbohydrate | fixedone }}</td>
          <td>{{ form.calories | fixedone }}</td>
          <td>
              <button :disabled="!formProduct" class="btn btn-outline-success btn-block btn-sm flex-item" @click="addItem">Добавить</button>
          </td>
        </tr>
        <basket-items-table-item v-for="item in basket.items" :key="item.productId" :basketItem="item" @drop="dropItem"/>
      </tbody>
    </table>
  </div>
</template>

<script>
import BasketItemsTableItemVue from './BasketItemsTableItem.vue'
// import { copyValue } from '@/helpers/helper'
export default {
  name: 'Basket',
  data () {
    return {
      basket: null,
      loading: true,
      disableSubmit: false,
      form: { productId: null, weight: null, protein: 0, fat: 0, carbohydrate: 0, calories: 0, hash: null }
    }
  },
  watch: {
    '$route': 'fetchData',
    'isFormChanged' (to, from) {
      let need = this.formProduct && this.form.weight
      this.form.protein = need ? this.formProduct.protein * this.form.weight / 100 : 0
      this.form.fat = need ? this.formProduct.fat * this.form.weight / 100 : 0
      this.form.carbohydrate = need ? this.formProduct.carbohydrate * this.form.weight / 100 : 0
      this.form.calories = need ? this.formProduct.calories * this.form.weight / 100 : 0
    }
  },
  created () {
    this.fetchData()
  },
  computed: {
    isFormChanged () {
      return this.form.productId + this.form.weight
    },
    formProduct () {
      return this.products.find((el) => parseInt(el.id) === parseInt(this.form.productId))
    },
    basketId () { return parseInt(this.$route.params.id) },
    products () { return this.$store.getters.products }
  },
  methods: {
    fetchData () {
      this.basket = null
      this.loading = true
      this.$store.dispatch('basketTLoad', this.basketId).then(
        (result) => {
          this.basket = result
          this.loading = false
        },
        (error) => {
          console.log(error)
        }
      )
    },
    addItem () {
      let product = this.basket.items.find((el) => el.productId === this.form.productId)
      if (!product) {
        this.basket.items.push({
          hash: this.$store.getters.getHash,
          productId: this.form.productId,
          weight: this.form.weight,
          protein: this.form.protein,
          fat: this.form.fat,
          carbohydrate: this.form.carbohydrate,
          calories: this.form.calories
        })
      } else {
        product.weight = parseInt(product.weight) + parseInt(this.form.weight)
      }
      this.form = { productId: null, weight: null, protein: 0, fat: 0, carbohydrate: 0, calories: 0, hash: null }
    },
    dropItem (item) {
      this.basket.items.splice(this.basket.items.indexOf(item), 1)
    },
    save () {
      this.disableSubmit = true
      this.$store.dispatch(this.productId ? 'updateBasket' : 'addBasket', this.basket).then(
        (result) => {
          this.disableSubmit = false
          this.errors = {}
          this.$router.push({name: 'products'})
        },
        (result) => {
          this.disableSubmit = false
          this.errors = result.response.data
        }
      )
    }
  },
  components: {
    basketItemsTableItem: BasketItemsTableItemVue
  }
}
</script>

<style scoped>
</style>
