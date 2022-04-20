<template>
  <BaseButton
    :class="[
      'basic compact',
      'main-compatibility-common-button',
      {
        disabled: isDisabled
      }
    ]"
    icon="music"
    :text="tracksText"
    @click="handleClick"
  />

  <BaseCommonProfileTracksModal
    ref="modal"
    :profile-id="profileId"
  />
</template>

<script>
import BaseButton from '*/components/buttons/BaseButton.vue'
import BaseCommonProfileTracksModal
  from '*/components/modals/profile/library/compatibility/BaseCommonProfileTracksModal.vue'

export default {
  name: 'TracksButton',
  components: {
    BaseButton,
    BaseCommonProfileTracksModal
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
      return this.$t(
        'counters.tracks',
        {
          count: this.tracksCount
        }
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
