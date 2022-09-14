<template>
  <div class="option">
    <div class="option-header">
      <BaseButton
        class="red option-button"
        icon="trash alternate outline"
        :class="{
          loading: isLoading,
          disabled: isLoading
        }"
        :text="clearText"
        :is-invertable="false"
        @click="handleClick"
      />
    </div>

    <div
      v-if="isSuccess"
      class="option-text"
    >
      <BaseIcon
        icon="green check"
      />

      <span
        v-text="clearedText"
      />
    </div>
  </div>
</template>

<script>
import {
  ipcRenderer
} from 'electron'
import BaseButton from '*/components/buttons/BaseButton.vue'
import BaseIcon from '*/components/BaseIcon.vue'

export default {
  name: 'ClearCacheOption',
  components: {
    BaseButton,
    BaseIcon
  },
  data () {
    return {
      isLoading: false,
      isSuccess: false
    }
  },
  computed: {
    clearText () {
      return this.$t(
        'settings.options.app.data.cache.clear'
      )
    },
    clearedText () {
      return this.$t(
        'settings.options.app.data.cache.cleared'
      )
    }
  },
  methods: {
    handleClick () {
      this.clearCache()
    },
    async clearCache () {
      this.isSuccess = false
      this.isLoading = true

      await ipcRenderer.invoke(
        'clear-cache'
      )

      this.isSuccess = true
      this.isLoading = false
    }
  }
}
</script>

<style lang="sass" scoped></style>
