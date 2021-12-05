<template>
  <BaseModalContainer ref="modal">
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
import BaseModalContainer from '@/containers/BaseModalContainer.vue'
import SearchInput from './BasePostAddTracksModal/SearchInput.vue'
import BaseClearButton from '@/buttons/BaseClearButton.vue'
import BaseDivider from '@/BaseDivider.vue'
import SearchList from './BasePostAddTracksModal/SearchList.vue'
import { generateKey } from '#/utils'

export default {
  name: 'BasePostAddTracksModal',
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
    handleSelect (value) {
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
    handleChange (value) {
      this.changeTracks(
        value
      )
    },
    handleResetButtonClick () {
      this.changeTracks([])

      this.$refs.input.focus()
      this.$refs.input.clear()
    },
    changeTracks (value) {
      this.$emit(
        'change',
        value
      )
    },
    show () {
      this.$refs.modal.show()
      this.$refs.input.focus()
    },
    hide () {
      this.$refs.modal.hide()
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
