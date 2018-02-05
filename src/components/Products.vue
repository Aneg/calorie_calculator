<template>
  <div class="products">
    <table border="1">
      <caption>
        Список продуктов
        <button class='button button-blue' @click="saveProducts">Сохранить</button>
        <button class='button button-gray' @click="revertProducts">Восстановить</button>
      </caption>
      <tr>
        <th>Название</th>
        <th>Белки</th>
        <th>Жиры</th>
        <th>Углеводы</th>
        <th>Калории</th>
        <th>Действия</th>
      </tr>
      <tr>
        <td><input placeholder="Название" v-model.lazy="form.name"></td>
        <td><input placeholder="Белки" v-model.lazy="form.protein"></td>
        <td><input placeholder="Жиры" v-model.lazy="form.fat"></td>
        <td><input placeholder="Углеводы" v-model.lazy="form.carbohydrate"></td>
        <td><input placeholder="Калории" v-model.lazy="form.calculus"></td>
        <td><button class='button button-green' @click="add">+</button></td>
      </tr>
      <tr v-for="(product, i) in products" v-bind:key='product.id'>
        <td><input v-model.lazy="product.name"></td>
        <td><input v-model.lazy="product.protein"></td>
        <td><input v-model.lazy="product.fat"></td>
        <td><input v-model.lazy="product.carbohydrate"></td>
        <td><input v-model.lazy="product.calculus"></td>
        <td><button class="button button-red" @click="drop(product.id)">-</button></td>
      </tr>
    </table>
  </div>
</template>

<script>
import { copyValue, dropOrUpdateObjectById } from '@/helpers/helper';
import generateId from '@/mixins/generateId.vue';

export default {
  name: 'Products',
  data () {
    return {
      products: [],
      form: {name: '', protein: '', carbohydrate: '', fat: '', calculus: ''}
    }
  },
  beforeMount() { 
    this.revertProducts();
  },
  created() {
    this.products = copyValue(this.$store.getters.products);
  },
  methods: {
    add() {
      this.products.unshift(this.form)
      this.form = {name: '', protein: '', carbohydrate: '', fat: '', calculus: ''}
    },
    drop(id) { 
      dropOrUpdateObjectById(this.products, id) 
    },
    saveProducts() {
      this.$store.dispatch('saveProducts', this.products);
    },
    revertProducts() {
      this.products = copyValue(this.$store.getters.products);
    }
  }
}
</script>

<style scoped>
.products {
  margin-bottom: 50px;
}
table {
  margin: 5px 10%;
  width: 80%;
}
</style>
