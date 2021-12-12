<template>
  <div class="folder-select-container">
    <div class="folder-select-input-container">
      <input
        class="folder-select-input"
        id="folder-select-input"
        type="file"
        :key="key"
        :disabled="!isReset"
        webkitdirectory
        @change="handleChange"
      />

      <label for="folder-select-input">
        <BaseButton
          icon="folder open"
          :class="{ disabled: !isReset }"
          :text="selectText"
        />
      </label>
    </div>

    <BaseClearButton
      v-if="!isReset"
      @click="handleResetButtonClick"
    />
  </div>
</template>

<script>
import BaseButton from '@/buttons/BaseButton.vue'
import BaseClearButton from '@/buttons/BaseClearButton.vue'
import { generateKey } from '#/utils'

export default {
  name: 'FolderSelectSection',
  components: {
    BaseButton,
    BaseClearButton
  },
  inject: [
    'setStatus',
    'setFiles'
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
        'shared.add.folder.select'
      )
    }
  },
  methods: {
    handleChange (event) {
      this.isReset = false
      this.key = generateKey()

      const files = [
        ...event.target.files
      ].filter(
        this.checkIfAudio
      )

      this.setStatus('import')
      this.setFiles(files)
    },
    handleResetButtonClick () {
      this.isReset = true

      this.setStatus(null)
      this.setFiles([])
    },
    checkIfAudio (file) {
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
