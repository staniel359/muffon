<template>
  <div class="main-settings-options-block">
    <BaseDivider
      :text="infoText"
      is-horizontal
    />

    <BaseProfileUpdateForm
      :is-active="isActive"
    />
  </div>
</template>

<script>
import BaseDivider from '*/components/BaseDivider.vue'
import BaseProfileUpdateForm
  from '*/components/forms/profile/BaseProfileUpdateForm.vue'

export default {
  name: 'InfoOptions',
  components: {
    BaseDivider,
    BaseProfileUpdateForm
  },
  props: {
    isActive: Boolean
  },
  computed: {
    infoText () {
      return this.$t(
        'settings.sections.profile.info'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
