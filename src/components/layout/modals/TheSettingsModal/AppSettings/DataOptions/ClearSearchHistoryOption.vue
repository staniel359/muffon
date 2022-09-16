<template>
  <div class="option">
    <div class="option-header">
      <BaseButton
        class="red circular option-button"
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
import electronStore from '*/plugins/electronStore'
import BaseButton from '*/components/buttons/BaseButton.vue'
import BaseIcon from '*/components/BaseIcon.vue'

export default {
  name: 'ClearSearchHistoryOption',
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
        'settings.options.app.data.history.search.clear'
      )
    },
    clearedText () {
      return this.$t(
        'settings.options.app.data.history.search.cleared'
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
      electronStore.delete(
        'history.search'
      )
      electronStore.delete(
        'history.librarySearch'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
