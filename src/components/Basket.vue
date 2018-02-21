<template>
  <div class="basket">
    <h2>
      {{ basketId ? 'Редактирование ' + basket.name : 'Добавленеие продукта' }}
      <button type="submit" :disabled="disableSubmit" class="btn btn-primary btn-sm float-right">Сохранить изменения</button
    ></h2>
    <hr/>
    <form @submit.prevent="save">
      <div class="form-group row">
          <div class="col-sm-12">
            <div class="form-group">
              <input
                v-model.number='basket.name'
                class="form-control"
                v-bind:class="{'is-invalid': errors.name}"
                placeholder="Название"
              >
              <div class="invalid-feedback" v-if="errors.name">
                {{ errors.name[0] }}
              </div>
            </div>
          </div>
          <div v-if="!basketId" class="col-sm-12">
            <button type="submit" :disabled="disableSubmit" class="btn btn-primary">Сохранить</button>
          </div>
      </div>
    </form>
    <basket-items-table v-if="basketId" />
  </div>
</template>

<script>
import BasketItemsTable from '@/components/BasketItemsTable'
export default {
  name: 'Basket',
  data () {
    return {
      basket: this.cleenBasket,
      disableSubmit: false,
      errors: {}
    }
  },
  created () {
    this.syncBasket()
  },
  watch: {
    'storeBasket' (to, from) {
      this.syncBasket()
    }
  },
  computed: {
    cleenBasket () {
      return { name: '', protein: '', fat: '', carbohydrate: '', calories: '' }
    },
    basketId () {
      return parseInt(this.$route.params.id)
    },
    storeBasket () {
      return this.$store.getters.basket(this.basketId)
    }
  },
  methods: {
    save () {
      this.disableSubmit = true
      this.$store.dispatch(this.basketId ? 'updateBasket' : 'addBasket', this.basket).then(
        (result) => {
          this.disableSubmit = false
          this.errors = {}
          this.$router.push({name: 'baskets'})
        },
        (result) => {
          this.disableSubmit = false
          this.errors = result.response.data
        }
      )
    },
    syncBasket (baskets = null) {
      let storeBasket = this.storeBasket
      this.basket = this.basketId && storeBasket
        ? this.storeBasket
        : this.cleenBasket
    },
    isValidDecimal (value) {
      return value - parseFloat(value) === 0
    }
  },
  components: {
    basketItemsTable: BasketItemsTable
  }
}
</script>

<style scoped>
</style>
