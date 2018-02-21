<template>
<tr>
  <td>{{ item.name }}</td>
  <td>
    <input v-model.number="item.weight" class="form-control" type="number">
  </td>
  <td>{{ item.protein | fixedone }}</td>
  <td>{{ item.fat | fixedone }}</td>
  <td>{{ item.carbohydrate | fixedone }}</td>
  <td>{{ item.calories | fixedone }}</td>
  <td>
    <button class="btn btn-outline-danger btn-sm  btn-block" @click="drop(basket.id)">Удалить</button>
  </td>
</tr>
</template>

<script>
import { copyValue } from '@/helpers/helper'
export default {
  name: 'BasketItemsTableItem',
  props: ['basketItem'],
  data () {
    return {
      item: {}
    }
  },
  created () {
    this.item = copyValue(this.basketItem)
  },
  watch: {
    'item.weight' (to, from) {
      this.item.protein = this.item.weight ? this.itemProduct.protein * this.item.weight / 100 : 0
      this.item.fat = this.item.weight ? this.itemProduct.fat * this.item.weight / 100 : 0
      this.item.carbohydrate = this.item.weight ? this.itemProduct.carbohydrate * this.item.weight / 100 : 0
      this.item.calories = this.item.weight ? this.itemProduct.calories * this.item.weight / 100 : 0
    }
  },
  computed: {
    itemProduct () {
      return this.$store.getters.product(this.item.productId)
    }
  },
  methods: {
  }
}
</script>
