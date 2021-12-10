<template>
  <BaseSegmentContainer
    :isLoading="isLoading"
    :error="error"
  >
    <div
      v-if="compatibilityData"
      class="compatibility-container"
    >
      <BasePercentCircle
        class="compatibility-percent"
        :side="40"
        :width="3.5"
        :percent="compatibilityPercent"
      />

      <CompatibilityContent
        :profileNickname="profileNickname"
        :compatibilityData="compatibilityData"
      />
    </div>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
import BasePercentCircle from '@/BasePercentCircle.vue'
import CompatibilityContent
  from './CompatibilitySegment/CompatibilityContent.vue'
import fetchProfileLibraryCompatibilityData
  from '#/actions/api/profile/library/compatibility/fetchData'

export default {
  name: 'CompatibilitySegment',
  components: {
    BaseSegmentContainer,
    BasePercentCircle,
    CompatibilityContent
  },
  props: {
    profileId: {
      type: String,
      required: true
    },
    profileNickname: String
  },
  data () {
    return {
      compatibilityData: null,
      error: null,
      isLoading: false
    }
  },
  computed: {
    compatibilityPercent () {
      return this.compatibilityData.percent
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchProfileLibraryCompatibilityData,
    fetchData () {
      this.fetchProfileLibraryCompatibilityData({
        otherProfileId: this.profileId
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.compatibility-container
  @extend .d-flex

.compatibility-percent
  width: 70px
  height: 70px
  flex: 0 0 auto
</style>
