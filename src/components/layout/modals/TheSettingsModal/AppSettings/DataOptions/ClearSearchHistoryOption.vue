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
