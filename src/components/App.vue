<template>
  <TheStylesObserver />

  <TheStoreObserver
    @init="handleStoreInit"
  />

  <PageLayout
    v-if="isStoreSet"
  />
</template>

<script>
import TheStylesObserver
  from '@/components/layout/observers/TheStylesObserver.vue'
import TheStoreObserver
  from '@/components/layout/observers/TheStoreObserver.vue'
import PageLayout from './App/PageLayout.vue'

export default {
  name: 'App',
  components: {
    TheStylesObserver,
    TheStoreObserver,
    PageLayout
  },
  data () {
    return {
      isStoreSet: false
    }
  },
  methods: {
    handleStoreInit () {
      this.isStoreSet = true
    }
  }
}
</script>

<style lang="sass"></style>
