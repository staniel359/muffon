<template>
  <div class="main-settings-options-block">
    <DeleteAccountOption />
  </div>
</template>

<script>
import DeleteAccountOption from './DataOptions/DeleteAccountOption.vue'

export default {
  name: 'DataOptions',
  components: {
    DeleteAccountOption
  }
}
</script>

<style lang="sass" scoped></style>
