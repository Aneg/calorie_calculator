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
            <router-link :to="{ name: 'baskets-create'}" tag='button' active-class="" class="btn btn-success btn-sm btn-block">Добавить</router-link>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="basket in basketsByPage" :key="basket.hash">
          <td>{{ basket.name }}</td>
          <td>{{ basket.protein }}</td>
          <td>{{ basket.fat }}</td>
          <td>{{ basket.carbohydrate }}</td>
          <td>{{ basket.calories }}</td>
          <td>
            <div class="btn-group flex-container" role="group">
              <router-link :to="{ name: 'product', params: { id: product.id }}" tag='button' active-class="" class="btn btn-outline-primary btn-sm flex-item">Изменеить</router-link>
              <button class="btn btn-outline-danger btn-sm flex-item" @click="drop(product.id)">Удалить</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="btn-group " role="group" aria-label="">
      <router-link
        :to="{name: 'products-page', params: {page: i}, query: {search: search}}"
        tag='a'
        class="btn"
        :class="{'btn-secondary': parseInt(i) === parseInt(page), 'btn-outline-secondary': parseInt(i) !== parseInt(page)}"
        v-for="i in pageCount"
        :key="i"
      >
        {{ i }}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BasketsTable',
  data () {
    return {
      baskets: [],
      sizePage: 15,
      pageCount: 1
    }
  },
  watch: {
    'searchBaskets' (to, from) {
      this.pageCount = Math.ceil(to.length / this.sizePage)
    }
  },
  created () {
    this.pageCount = Math.ceil(this.searchBaskets.length / this.sizePage)
  },
  computed: {
    page () {
      return this.$route.params.page || 1
    },
    storeBaskets () {
      return this.$store.getters.baskets
    },
    searchBaskets () {
      return this.storeBaskets.filter((el) => el.name.includes(this.search))
    },
    basketsByPage () {
      let start = (this.page - 1) * (this.sizePage)
      return this.searchBaskets.slice(start, start + this.sizePage)
    },
    search () {
      return this.$route.query.search || ''
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
.flex-item {
  width: 100%;
  }
  .flex-container {
  width: 100%;
  }
</style>
