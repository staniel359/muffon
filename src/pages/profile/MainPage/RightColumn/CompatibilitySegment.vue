<template>
  <BaseSegmentContainer
    class="raised main-segment-container"
    :response-data="compatibilityData"
    :is-loading="isLoading"
    :error="error"
    @refresh="handleRefresh"
  >
    <div
      v-if="compatibilityData"
      class="d-flex"
    >
      <BasePercentCircle
        class="compatibility-percent"
        :side="40"
        :width="3.5"
        :percent="compatibilityPercent"
      />

      <CompatibilityContent
        :profile-id="profileId"
        :profile-nickname="profileNickname"
        :compatibility-data="compatibilityData"
      />
    </div>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BasePercentCircle from '@/components/BasePercentCircle.vue'
import CompatibilityContent
  from './CompatibilitySegment/CompatibilityContent.vue'
import getLibraryCompatibility
  from '@/helpers/actions/api/library/compatibility/get'

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
    this.getData()
  },
  methods: {
    getLibraryCompatibility,
    handleRefresh () {
      this.getData()
    },
    getData () {
      this.getLibraryCompatibility(
        {
          otherProfileId: this.profileId
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.compatibility-percent
  width: 70px
  height: 70px
  flex: 0 0 auto
</style>
