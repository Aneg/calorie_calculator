<template>
  <div id="app">
    <div>
      <router-link to="/products" tag='a'>Продукты</router-link>
      <router-link to="/" tag='a'>Корзина</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import Products from '@/components/Products.vue'
import Calculator from '@/components/Calculator.vue'

export default {
  name: 'App',
  created () {
    this.$store.dispatch('setProducts')
  },
  components: {
    Products,
    Calculator
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
  background-color:#F8F8FF;
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
