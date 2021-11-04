<template>
  <div class="content">
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
import local from '#/plugins/local'
import BaseButton from '@/BaseButton.vue'

export default {
  name: 'ClearSearchHistoryOption',
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
        'layout.settings.options.app.data.history.search.clear'
      )
    },
    successFormatted () {
      return this.$t(
        'layout.settings.options.app.data.history.search.cleared'
      )
    }
  },
  methods: {
    async handleClick () {
      this.isSuccess = false
      this.isLoading = true

      await this.clearHistory()

      this.isSuccess = true
      this.isLoading = false
    },
    clearHistory () {
      local.delete(
        'history.search'
      )
      local.delete(
        'history.librarySearch'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
