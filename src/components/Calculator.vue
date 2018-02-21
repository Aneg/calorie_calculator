<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Calculator',
  data () {
    return {
      // search: ''
    }
  },
  computed: {
    // querySearch () {
    //   return this.$route.query.search || ''
    // }
  },
  created () {
    // this.search = this.querySearch
  },
  methods: {
    // submitSearch () {
    //   this.$router.push({name: 'baskets', query: {search: this.search}})
    // }
  }
}
</script>

<style scoped>
</style>
