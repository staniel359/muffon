<template>
  <div class="compatibility-content">
    <BaseHeader
      class="compatibility-header"
      tag="h4"
      :text="headerText"
    />

    <div class="compatibility-common-text">
      {{ commonText }}
    </div>

    <CommonButtons
      :compatibilityData="compatibilityData"
    />
  </div>
</template>

<script>
import BaseHeader from '@/BaseHeader.vue'
import CommonButtons from './CompatibilityContent/CommonButtons.vue'

export default {
  name: 'CompatibilityContent',
  components: {
    BaseHeader,
    CommonButtons
  },
  props: {
    profileNickname: {
      type: String,
      required: true
    },
    compatibilityData: Object
  },
  computed: {
    headerText () {
      return this.$t(
        'pages.profile.compatibility.header',
        { profileNickname: this.profileNickname }
      )
    },
    commonText () {
      return this.$t(
        'pages.profile.compatibility.common'
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.compatibility-content
  margin-left: 1em

.compatibility-header
  margin-bottom: 0.25em !important

.compatibility-common-text
  margin-bottom: 0.25em
</style>
