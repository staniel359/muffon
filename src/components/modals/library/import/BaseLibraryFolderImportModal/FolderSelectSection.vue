<template>
  <div class="folder-select-container">
    <div class="folder-select-input-container">
      <BaseButton
        class="basic circular"
        icon="folder open"
        :class="{
          disabled: !isReset
        }"
        :text="selectText"
        @click="handleFolderButtonClick"
      />

      <input
        ref="input"
        :key="key"
        class="folder-select-input"
        type="file"
        webkitdirectory
        @change="handleChange"
      >
    </div>

    <BaseClearButton
      v-if="!isReset"
      @click="handleClearButtonClick"
    />
  </div>
</template>

<script>
import BaseButton from '@/components/buttons/BaseButton.vue'
import BaseClearButton from '@/components/buttons/BaseClearButton.vue'
import {
  generateKey
} from '@/helpers/utils'

export default {
  name: 'FolderSelectSection',
  components: {
    BaseButton,
    BaseClearButton
  },
  inject: [
    'import',
    'reset'
  ],
  data () {
    return {
      key: null,
      isReset: true
    }
  },
  computed: {
    selectText () {
      return this.$t(
        'actions.folder.select'
      )
    }
  },
  methods: {
    handleFolderButtonClick () {
      this.showInput()
    },
    handleChange (
      event
    ) {
      this.isReset = false
      this.key = generateKey()

      const files = [
        ...event.target.files
      ]

      const audioFiles =
        files.filter(
          this.isAudioFile
        )

      this.import(
        audioFiles
      )
    },
    handleClearButtonClick () {
      this.isReset = true

      this.reset()
    },
    showInput () {
      this.$refs
        .input
        .click()
    },
    isAudioFile (
      file
    ) {
      return file.type.startsWith(
        'audio'
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.folder-select-container
  @extend .d-flex, .align-items-center

.folder-select-input-container
  @extend .flex-full

.folder-select-input
  @extend .d-none
</style>
