<template>
  <div class="main-right-section">
    <BaseHeader
      tag="h4"
      :text="headerText"
    />

    <p
      class="main-text-section"
      v-text="commonText"
    />

    <CommonButtons
      :profile-id="profileId"
      :compatibility-data="compatibilityData"
    />
  </div>
</template>

<script>
import BaseHeader from '@/components/headers/BaseHeader.vue'
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
    profileId: Number,
    compatibilityData: Object
  },
  computed: {
    headerText () {
      return this.$t(
        'compatibility.header',
        {
          profileNickname: this.profileNickname
        }
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

<style lang="sass" scoped></style>
