<template>
  <BaseButton
    class="basic circular compact main-compatibility-common-button"
    left-icon="album"
    :class="{
      disabled: isDisabled
    }"
    :text="albumsText"
    @click="handleClick"
  />

  <BaseCommonAlbumsModal
    ref="modal"
    :profile-id="profileId"
  />
</template>

<script>
import BaseButton from '@/components/buttons/BaseButton.vue'
import BaseCommonAlbumsModal
  from '@/components/modals/library/compatibility/BaseCommonAlbumsModal.vue'
import {
  number as formatNumber
} from '@/helpers/formatters'

export default {
  name: 'AlbumsButton',
  components: {
    BaseButton,
    BaseCommonAlbumsModal
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
      return !this.albumsCount
    },
    albumsCount () {
      return this.compatibilityData.albums_count
    },
    albumsText () {
      return this.$tc(
        'counters.nominative.albums',
        this.albumsCount,
        {
          count: this.albumsCountFormatted
        }
      )
    },
    albumsCountFormatted () {
      return formatNumber(
        this.albumsCount
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
