<template>
  <BaseCheckbox
    class="main-as-community-checkbox"
    name="community"
    :is-checked="isChecked"
    :text="asCommunityText"
  />
</template>

<script>
import BaseCheckbox from '@/components/BaseCheckbox.vue'

export default {
  name: 'BaseAsCommunityField',
  components: {
    BaseCheckbox
  },
  props: {
    isChecked: Boolean
  },
  computed: {
    asCommunityText () {
      return this.$t(
        'forms.fields.asCommunity'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
