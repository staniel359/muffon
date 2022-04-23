<template>
  <BaseButton
    :class="[
      'basic compact',
      'main-compatibility-common-button',
      {
        disabled: isDisabled
      }
    ]"
    icon="record vinyl"
    :text="albumsText"
    @click="handleClick"
  />

  <BaseCommonProfileAlbumsModal
    ref="modal"
    :profile-id="profileId"
  />
</template>

<script>
import BaseButton from '*/components/buttons/BaseButton.vue'
import BaseCommonProfileAlbumsModal
  from '*/components/modals/profile/library/compatibility/BaseCommonProfileAlbumsModal.vue'
import {
  number as formatNumber
} from '*/helpers/formatters'

export default {
  name: 'AlbumsButton',
  components: {
    BaseButton,
    BaseCommonProfileAlbumsModal
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
