<template>
  <BaseButton
    class="basic circular compact main-compatibility-common-button"
    left-icon="track"
    :class="{
      disabled: isDisabled
    }"
    :text="tracksText"
    @click="handleClick"
  />

  <BaseCommonTracksModal
    ref="modal"
    :profile-id="profileId"
  />
</template>

<script>
import BaseButton from '@/components/buttons/BaseButton.vue'
import BaseCommonTracksModal
  from '@/components/modals/library/compatibility/BaseCommonTracksModal.vue'
import {
  number as formatNumber
} from '@/helpers/formatters'

export default {
  name: 'TracksButton',
  components: {
    BaseButton,
    BaseCommonTracksModal
  },
  props: {
    compatibilityData: {
      type: Object,
      required: true
    },
    profileId: String
  },
  computed: {
    isDisabled () {
      return !this.tracksCount
    },
    tracksCount () {
      return this.compatibilityData.tracks_count
    },
    tracksText () {
      return this.$tc(
        'counters.nominative.tracks',
        this.tracksCount,
        {
          count: this.tracksCountFormatted
        }
      )
    },
    tracksCountFormatted () {
      return formatNumber(
        this.tracksCount
      )
    }
  },
  methods: {
    handleClick () {
      this.showModal()
    },
    showModal () {
      this.$refs
        .modal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
