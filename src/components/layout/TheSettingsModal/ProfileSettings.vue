<template>
  <div class="profile-settings-container">
    <InfoOptions />
  </div>
</template>

<script>
import InfoOptions from './ProfileSettings/InfoOptions.vue'

export default {
  name: 'ProfileSettings',
  components: {
    InfoOptions
  }
}
</script>

<style lang="sass" scoped>
.profile-settings-container
  @extend .d-flex, .flex-column, .overflow-y-auto
</style>
