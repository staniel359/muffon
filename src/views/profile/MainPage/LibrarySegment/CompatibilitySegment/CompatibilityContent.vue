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
      :profileId="profileId"
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
    profileId: String,
    compatibilityData: Object
  },
  computed: {
    headerText () {
      return this.$t(
        'compatibility.header',
        { profileNickname: this.profileNickname }
      )
    },
    commonText () {
      return this.$t(
        'compatibility.common'
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
