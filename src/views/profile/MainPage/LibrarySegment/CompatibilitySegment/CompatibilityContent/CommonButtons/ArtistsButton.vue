<template>
  <BaseButton
    :class="[
      'basic compact',
      'main-compatibility-common-button',
      {
        disabled: isDisabled
      }
    ]"
    icon="microphone alternate"
    :text="artistsText"
    @click="handleClick"
  />

  <BaseCommonProfileArtistsModal
    ref="modal"
    :profile-id="profileId"
  />
</template>

<script>
import BaseButton from '*/components/buttons/BaseButton.vue'
import BaseCommonProfileArtistsModal
  from '*/components/modals/profile/library/compatibility/BaseCommonProfileArtistsModal.vue'

export default {
  name: 'ArtistsButton',
  components: {
    BaseButton,
    BaseCommonProfileArtistsModal
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
      return !this.artistsCount
    },
    artistsCount () {
      return this.compatibilityData.artists_count
    },
    artistsText () {
      return this.$t(
        'counters.artists',
        {
          count: this.artistsCount
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
