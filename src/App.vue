<template>
  <div id="app">
    <!--<router-view/>-->
    <Products :old_products='products' @updateProducts='updateProducts'></Products>
    <hr/>
    <Calculator :products='products'></Calculator>
  </div>
</template>

<script>
import Products from '@/components/Products.vue'
import Calculator from '@/components/Calculator.vue'
import { dropOrUpdateObjectById } from '@/helpers/helper'
import generateId from '@/mixins/generateId.vue'
export default {
  name: 'App',
  mixins: [generateId],
  data () {
    return {
    products: [
        { id: 1, name: 'Гречка', protein: 12.6, carbohydrate: 62.1, fat: 3.3, calculus: 313 },
        { id: 2, name: 'Куриное филе', protein: 23.1, carbohydrate: 0.0, fat: 1.2, calculus: 110 }
      ],
    }
  },
  components: {
    Products,
    Calculator
  },
  methods: {
    addProduct(product) {
      product.id = this.generateNextId
      this.products.unshift(product)
    },
    updateProducts(products) {
      this.generateIdByObject(this.products = products)
    },
    dropOrUpdateProduct(id, newProduct = null) {
      dropOrUpdateObjectById(this.products, id, newProduct)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.button {
    background-color: #4CAF50; /* Green */
    border: none;
    color: white;
    padding: 5px 15px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 20px;
}
.button-green {background-color: #4CAF50;} /* Green */
.button-blue {background-color: #008CBA;} /* Green */
.button-red {background-color: #f44336;} /* Red */ 
.button-gray {background-color: #e7e7e7; color: black;} /* Gray */ 
.button-black {background-color: #555555;} /* Black */
body {
  background-color:	#F8F8FF;
}

table, td, th {
  border-top-style: none;
  border-left-style: none;
  border-right-style: none;
}
table {
  background-color: #fff;
  border-bottom-style: none;
  box-shadow: 5px 10px 10px rgba(0,0,0,0.5);
}
td, th {
  padding: 5px 30px;
}
th {
  box-shadow: 0px 0px 5px rgba(0,0,0,0.3);
}
tr {
  border-bottom: 15px solid #DCDCDC;
  text-align: center;
}
.input {
  display: inline-block;
  width: 19%;
}
td input, td input:focus {
  border: none;
  box-shadow:none;
  outline: none;
  height: 25px;
  text-align: center;
}
</style>
