<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Название</th>
          <th scope="col">Белки</th>
          <th scope="col">Жиры</th>
          <th scope="col">Углеводы</th>
          <th scope="col">Калорийность</th>
          <th scope="col">
            <router-link :to="{ name: 'create'}" tag='button' active-class="" class="btn btn-success btn-sm btn-block">Добавить</router-link>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in storeProducts" :key="product.hash">
          <td>{{ product.name }}</td>
          <td>{{ product.protein }}</td>
          <td>{{ product.fat }}</td>
          <td>{{ product.carbohydrate }}</td>
          <td>{{ product.calories }}</td>
          <td>
            <div class="btn-group btn-block" role="group">
              <router-link :to="{ name: 'product', params: { id: product.id }}" tag='button' active-class="" class="btn btn-primary btn-sm">Изменеить</router-link>
              <button class="btn btn-danger btn-sm btn-block" @click="drop(product.id)">Удалить</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Products',
  data () {
    return {
      products: []
    }
  },
  computed: {
    storeProducts () {
      return this.$store.getters.products
    }
  },
  methods: {
    drop (id) {
      console.log(id)
      this.$store.dispatch('dropProduct', id)
    }
  }
}
</script>

<style scoped>
</style>
