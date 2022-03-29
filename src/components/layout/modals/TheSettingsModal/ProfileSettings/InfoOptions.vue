<template>
  <div class="main-settings-options-block">
    <BaseDivider
      :text="infoText"
      isHorizontal
    />

    <BaseProfileUpdateForm />
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
