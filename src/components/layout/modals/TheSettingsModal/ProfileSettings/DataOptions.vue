<template>
  <div class="main-settings-options-block">
    <DeleteLibraryOption />

    <DeleteAccountOption />
  </div>
</template>

<script>
import DeleteLibraryOption from './DataOptions/DeleteLibraryOption.vue'
import DeleteAccountOption from './DataOptions/DeleteAccountOption.vue'

export default {
  name: 'DataOptions',
  components: {
    DeleteLibraryOption,
    DeleteAccountOption
  }
}
</script>

<style lang="sass" scoped></style>
