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
            <option v-for='product in products' :value="product.id">{{product.name}}</option>
          </select>
        <td><input placeholder="Вес" v-model="form.weight"></td>
        <td><button class='button button-green' @click="addToBasket">+</button></td>
        <td>{{ protein }}</td>
      <td>{{ fat }}</td>
      <td>{{ carbohydrate }}</td>
      <td>{{ calculus }}</td>
      </tr>
      <tr v-for="(product, i) in basket.list">
        <td>{{product.name }}</td>
        <td><input v-model="product.weight"></td>
        <td><button class="button button-red" @click="dropFromBasket(i)">-</button></td>
      </tr>
    </table>
  </div>
</template>

<script>
import { copyValue, findObjectById, dropOrUpdateObjectById } from '@/helpers/helper'
export default {
  props: {
    products: Array,
    old_basket: Object
  },
  computed: {
    protein() { 
      return this.getCount('protein');
    }, 
    carbohydrate() { 
      return this.getCount('carbohydrate');
    }, 
    fat() { 
      return this.getCount('fat');
    }, 
    calculus() { 
      return this.getCount('calculus');
    }
  },
  data () {
    return {
      form: {product_id: '', weight: ''},
      basket: []
    }
  },
  beforeMount() { 
    this.revert() 
  },
  methods: {
    getCount(name) {
      var protein = 0
      this.basket.list.forEach((item) => {
        // TODO: выводить ошибку, если продукт не найден.
        protein += findObjectById(this.products, item.product_id)[name]*item.weight/100
      })
      return protein.toFixed(1);
    },
    addToBasket () {
      this.form.name = findObjectById(this.products, this.form.product_id).name
      this.basket.list.unshift(this.form)
      this.form = {product_id: '', weight: ''}
    },
    dropFromBasket(key) {
      this.basket.list.splice(key, 1)
      // this.$emit('dropOrupdateBasket', this.basket.id, this.basket)  
    },
    drop() {
      this.$emit('dropOrupdateBasket', this.basket.id)
    },
    save() {
      this.$emit('dropOrupdateBasket', this.basket.id, this.basket)
    },
    revert() {
      this.basket = copyValue(this.old_basket)
    },
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