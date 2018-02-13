<template>
  <div class="product">
    <h2>Добавленеие продукта</h2>
    <hr/>
    <form @submit.prevent="save">
      <div class="form-group row">
        <div class='row'>
          <div class="col-sm-12">
            <div class="form-group">
              <input v-model.number='product.name' class="form-control" placeholder="Название">
            </div>
          </div>
          <hr/>
          <div class="col-sm-3">
            <div class="form-group">
              <label class="text-center col-form-label">Белки</label>
              <input class="form-control" placeholder="Белки" v-model.number='product.protein'>
            </div>
          </div>
          <div class="col-sm-3">
            <div class="form-group">
              <label class="text-center col-form-label">Жиры</label>
              <input class="form-control" placeholder="Жиры" v-model.number='product.fat'>
            </div>
          </div>
          <div class="col-sm-3">
            <div class="form-group">
              <label class="text-center col-form-label">Углеводы</label>
              <input class="form-control" placeholder="Углеводы" v-model.number='product.carbohydrate'>
            </div>
          </div>
          <div class="col-sm-3">
            <div class="form-group">
              <label class="text-center col-form-label">Калорийность</label>
              <input class="form-control" placeholder="Калорийность" v-model.number='product.calories'>
            </div>
          </div>
          <div class="col-sm-12">
            <button type="submit" class="btn btn-primary">Сохранить</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>

export default {
  name: 'Product',
  data () {
    return {
      product: this.cleenProduct
    }
  },
  created () {
    this.syncProduct()
  },
  watch: {
    'storeProduct' (to, from) {
      this.syncProduct()
    }
  },
  computed: {
    cleenProduct () {
      return { name: '', protein: '', fat: '', carbohydrate: '', calories: '' }
    },
    productId () {
      return parseInt(this.$route.params.id)
    },
    storeProduct () {
      return this.$store.getters.product(this.productId)
    }
  },
  methods: {
    save () {
      this.$store.dispatch(this.productId ? 'updateProduct' : 'addProduct', this.product)
      this.$router.push({name: 'products'})
    },
    syncProduct (products = null) {
      this.product = this.productId
        ? this.storeProduct
        : this.cleenProduct
    }
  }
}
</script>

<style scoped>
</style>
