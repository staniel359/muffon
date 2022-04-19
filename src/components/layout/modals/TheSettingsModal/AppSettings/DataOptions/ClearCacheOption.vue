<template>
  <div class="content">
    <div class="header">
      <BaseButton
        class="basic red"
        icon="trash alternate outline"
        :text="clearText"
        :class="{
          loading: isLoading,
          disabled: isLoading
        }"
        @click="handleClick"
      />
    </div>

    <div v-if="isSuccess">
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
      this.isSuccess = false
      this.isLoading = true

      const handleSuccess = () => {
        this.isSuccess = true
      }

      const handleFinish = () => {
        this.isLoading = false
      }

      ipcRenderer.invoke(
        'clear-cache'
      ).then(
        handleSuccess
      ).finally(
        handleFinish
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
