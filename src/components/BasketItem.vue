<template>
      <tr>
        <td>{{ product.name }}</td>
        <td><input v-model.number.lazy="weight"></td>
        <td><button class="button button-red" @click="drop()">-</button></td>
        <td>{{ product.protein | fixedone }}</td>
        <td>{{ product.fat | fixedone }}</td>
        <td>{{ product.carbohydrate | fixedone }}</td>
        <td>{{ product.calculus | fixedone }}</td>
      </tr>
</template>

<script>
// import { copyValue } from '@/helpers/helper'
export default {
  props: {
    product: Object,
    oldWeight: Number,
    keyItem: Number
  },
  data () {
    return {
      weight: 0
    }
  },
  beforeMount () {
    debugger
    this.weight = this.oldWeight
  },
  drop () {
    this.$emit('drop', this.keyItem)
  },
  save () {
    this.$emit('save', {key: this.keyItem, weight: this.weight})
  }
}
</script>

<style scoped>
</style>
