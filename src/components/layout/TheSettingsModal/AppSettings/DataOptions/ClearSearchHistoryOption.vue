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
import { localize } from '#/actions/plugins/i18n'

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
      return localize(
        'layout.settings.options.data.history.search.clear'
      )
    },
    successFormatted () {
      return localize(
        'layout.settings.options.data.history.search.cleared'
      )
    }
  },
  methods: {
    async handleClick () {
      this.isSuccess = false
      this.isLoading = true

      await local.delete(
        'history.search'
      )

      this.isSuccess = true
      this.isLoading = false
    }
  }
}
</script>

<style lang="sass" scoped></style>
