<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <div class="option-header">
        <BaseButton
          class="red circular option-button"
          left-icon="delete"
          :class="{
            loading: isLoading,
            disabled: isLoading
          }"
          :text="clearText"
          :is-invertable="false"
          @click="handleClick"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/buttons/BaseButton.vue'
import notificationMixin from '@/mixins/notificationMixin'
import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'

export default {
  name: 'ClearHistoryOption',
  components: {
    BaseButton
  },
  mixins: [
    notificationMixin
  ],
  data () {
    return {
      isLoading: false
    }
  },
  computed: {
    clearText () {
      return this.$t(
        'settings.options.app.search.history.clear'
      )
    },
    notificationSuccessMessage () {
      return this.$t(
        'notifications.cleared.searchHistory'
      )
    }
  },
  methods: {
    async handleClick () {
      this.isLoading = true

      await this.clearHistory()

      this.isLoading = false

      this.notifySuccess()
    },
    clearHistory () {
      return updateGlobalStore(
        {
          'history.search': [],
          'history.librarySearch': []
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
