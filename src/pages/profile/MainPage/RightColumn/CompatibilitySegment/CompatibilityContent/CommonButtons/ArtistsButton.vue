<template>
  <BaseButton
    class="basic circular compact main-compatibility-common-button"
    left-icon="artist"
    :class="{
      disabled: isDisabled
    }"
    :text="artistsText"
    @click="handleClick"
  />

  <BaseCommonArtistsModal
    ref="modal"
    :profile-id="profileId"
  />
</template>

<script>
import BaseButton from '@/components/buttons/BaseButton.vue'
import BaseCommonArtistsModal
  from '@/components/modals/library/compatibility/BaseCommonArtistsModal.vue'
import {
  number as formatNumber
} from '@/helpers/formatters'

export default {
  name: 'ArtistsButton',
  components: {
    BaseButton,
    BaseCommonArtistsModal
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
      return this.$tc(
        'counters.nominative.artists',
        this.artistsCount,
        {
          count: this.artistsCountFormatted
        }
      )
    },
    artistsCountFormatted () {
      return formatNumber(
        this.artistsCount
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
