<template>
  <div>
    <InfoOptions
      :is-active="isActive"
    />
  </div>
</template>

<script>
import InfoOptions from './ProfileSettings/InfoOptions.vue'

export default {
  name: 'ProfileSettings',
  components: {
    InfoOptions
  },
  props: {
    isActive: Boolean
  }
}
</script>

<style lang="sass" scoped></style>
