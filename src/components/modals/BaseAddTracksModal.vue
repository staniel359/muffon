<template>
  <BaseModalContainer
    ref="modal"
    @visible="handleVisible"
  >
    <div class="content main-modal-content-full-height">
      <div class="top-section-container">
        <SearchInput
          ref="input"
          :tracks="tracks"
          @select="handleSelect"
        />

        <BaseClearButton
          v-if="tracks.length"
          class="reset-button"
          @click="handleResetButtonClick"
        />
      </div>

      <BaseDivider />

      <SearchList
        :tracks="tracks"
        @change="handleChange"
      />
    </div>
  </BaseModalContainer>
</template>

<script>
import BaseModalContainer
  from '*/components/containers/modals/BaseModalContainer.vue'
import SearchInput from './BaseAddTracksModal/SearchInput.vue'
import BaseClearButton from '*/components/buttons/BaseClearButton.vue'
import BaseDivider from '*/components/BaseDivider.vue'
import SearchList from './BaseAddTracksModal/SearchList.vue'
import {
  generateKey
} from '*/helpers/utils'

export default {
  name: 'BaseAddTracksModal',
  components: {
    BaseModalContainer,
    SearchInput,
    BaseClearButton,
    BaseDivider,
    SearchList
  },
  provide () {
    return {
      hideModal: this.hide
    }
  },
  props: {
    tracks: {
      type: Array,
      default () {
        return []
      }
    }
  },
  emits: [
    'change'
  ],
  methods: {
    handleVisible () {
      this.focusInput()
    },
    handleSelect (
      value
    ) {
      const trackData = {
        uuid: generateKey(),
        ...value
      }

      const tracks = [
        ...this.tracks,
        trackData
      ]

      this.changeTracks(
        tracks
      )
    },
    handleChange (
      value
    ) {
      this.changeTracks(
        value
      )
    },
    handleResetButtonClick () {
      this.changeTracks(
        []
      )

      this.focusInput()

      this.clearInput()
    },
    changeTracks (
      value
    ) {
      this.$emit(
        'change',
        value
      )
    },
    show () {
      this.$refs
        .modal
        .show()
    },
    hide () {
      this.$refs
        .modal
        .hide()
    },
    focusInput () {
      this.$refs
        .input
        .focus()
    },
    clearInput () {
      this.$refs
        .input
        .clear()
    }
  }
}
</script>

<style lang="sass" scoped>
.top-section-container
  @extend .d-flex, .align-items-center

.reset-button
  margin-left: 1em !important
</style>
