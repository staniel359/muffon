<template>
  <div class="main-settings-options-block">
    <LastfmOptions />
  </div>
</template>

<script>
import LastfmOptions from './ServicesSettings/LastfmOptions.vue'

export default {
  name: 'ServicesSettings',
  components: {
    LastfmOptions
  }
}
</script>

<style lang="sass" scoped></style>
