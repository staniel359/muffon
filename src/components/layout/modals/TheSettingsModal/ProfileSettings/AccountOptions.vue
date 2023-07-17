<template>
  <div class="main-settings-options-block">
    <DeleteOption />
  </div>
</template>

<script>
import DeleteOption from './AccountOptions/DeleteOption.vue'

export default {
  name: 'AccountOptions',
  components: {
    DeleteOption
  }
}
</script>

<style lang="sass" scoped></style>
