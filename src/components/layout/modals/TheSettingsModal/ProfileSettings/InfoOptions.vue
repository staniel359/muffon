<template>
  <div class="main-settings-options-block">
    <BaseDivider
      :text="headerFormatted"
      isHorizontal
    />

    <BaseProfileEditForm />
  </div>
</template>

<script>
import BaseDivider from '@/BaseDivider.vue'
import BaseProfileEditForm from '@/forms/profile/BaseProfileEditForm.vue'

export default {
  name: 'InfoOptions',
  components: {
    BaseDivider,
    BaseProfileEditForm
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
