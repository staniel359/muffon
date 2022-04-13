<template>
  <div
    ref="checkbox"
    class="ui checkbox main-as-community-checkbox"
  >
    <input
      type="checkbox"
      name="community"
      :checked="isChecked"
    >

    <label
      v-text="asCommunityText"
    />
  </div>
</template>

<script>
import {
  setCheckbox
} from '*/helpers/actions/plugins/semantic'

export default {
  name: 'BasePostAsCommunityField',
  props: {
    isChecked: Boolean
  },
  computed: {
    asCommunityText () {
      return this.$t(
        'forms.fields.asCommunity'
      )
    }
  },
  mounted () {
    setCheckbox(
      this.$refs.checkbox
    )
  }
}
</script>

<style lang="sass" scoped></style>
