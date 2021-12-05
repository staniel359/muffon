<template>
  <div class="main-settings-options-block">
    <BaseDivider
      :text="headerFormatted"
      isHorizontal
    />

    <BaseEditForm />
  </div>
</template>

<script>
import BaseDivider from '@/BaseDivider.vue'
import BaseEditForm from '@/models/profile/BaseEditForm.vue'

export default {
  name: 'InfoOptions',
  components: {
    BaseDivider,
    BaseEditForm
  },
  computed: {
    headerFormatted () {
      return this.$t(
        'layout.settings.sections.profile.info'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
