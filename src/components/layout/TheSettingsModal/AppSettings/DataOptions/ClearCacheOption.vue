<template>
  <div class="content clear-cache-option">
    <div class="header">
      <BaseButton
        :text="buttonTextFormatted"
        :class="{
          loading: isLoading,
          disabled: isLoading
        }"
        @click="handleClick"
      />
    </div>

    <div v-if="isSuccess">
      <i class="check green icon"></i>
      <span>
        {{ successFormatted }}
      </span>
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import BaseButton from '@/BaseButton.vue'

export default {
  name: 'ClearCacheOption',
  components: {
    BaseButton
  },
  data () {
    return {
      isLoading: false,
      isSuccess: false
    }
  },
  computed: {
    buttonTextFormatted () {
      return this.$t(
        'layout.settings.options.app.data.cache.clear'
      )
    },
    successFormatted () {
      return this.$t(
        'layout.settings.options.app.data.cache.cleared'
      )
    }
  },
  methods: {
    handleClick () {
      this.isSuccess = false
      this.isLoading = true

      const handleSuccess = () => {
        this.isSuccess = true
      }

      const handleFinish = () => {
        this.isLoading = false
      }

      ipcRenderer
        .invoke('clear-cache')
        .then(handleSuccess)
        .finally(handleFinish)
    }
  }
}
</script>

<style lang="sass" scoped>
.clear-cache-option
  margin-bottom: 0.5em
</style>
