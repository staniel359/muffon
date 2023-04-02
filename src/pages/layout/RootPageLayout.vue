<template>
  <TheRootBackground />

  <TheView />
</template>

<script>
import TheRootBackground from '@/components/layout/TheRootBackground.vue'
import TheView from '@/components/layout/TheView.vue'

export default {
  name: 'RootPageLayout',
  components: {
    TheRootBackground,
    TheView
  }
}
</script>

<style lang="sass" scoped></style>
