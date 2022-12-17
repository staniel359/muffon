<template>
  <div>
    <BaseErrorMessage
      v-if="error"
      class="connect-error"
      :error="error"
    />

    <div class="connect-block-container">
      <ImportButton
        :is-loading="isLoading"
        :is-user-data="!!userData"
        @click="handleImportButtonClick"
      />

      <BaseClearButton
        v-if="userData"
        @click="handleClearButtonClick"
      />
    </div>

    <BaseMessage
      v-if="!userData"
      class="history-visible-message"
      icon="infoCircle"
      :content="historyVisibleText"
    />

    <template
      v-if="userData"
    >
      <BaseDivider />

      <UserInfoSection
        :user-data="userData"
      />
    </template>
  </div>
</template>

<script>
import BaseErrorMessage from '@/components/messages/BaseErrorMessage.vue'
import ImportButton from './ConnectSection/ImportButton.vue'
import BaseClearButton from '@/components/buttons/BaseClearButton.vue'
import BaseMessage from '@/components/messages/BaseMessage.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import UserInfoSection from './ConnectSection/UserInfoSection.vue'
import getLastfmUser from '@/helpers/actions/api/lastfm/user/get'

export default {
  name: 'ConnectSection',
  components: {
    BaseErrorMessage,
    ImportButton,
    BaseClearButton,
    BaseMessage,
    BaseDivider,
    UserInfoSection
  },
  inject: [
    'import',
    'reset'
  ],
  data () {
    return {
      userData: null,
      error: null,
      isLoading: false
    }
  },
  computed: {
    historyVisibleText () {
      return this.$t(
        'import.lastfm.historyVisible'
      )
    }
  },
  watch: {
    userData: 'handleUserDataChange'
  },
  methods: {
    getLastfmUser,
    handleImportButtonClick () {
      this.getLastfmUser()
    },
    handleUserDataChange (
      value
    ) {
      this.import(
        value
      )
    },
    handleClearButtonClick () {
      this.error = null
      this.userData = null

      this.reset()
    }
  }
}
</script>

<style lang="sass" scoped>
.connect-error
  margin-bottom: 1em !important

.connect-block-container
  @extend .d-flex, .align-items-center

.history-visible-message
  margin-top: 1em !important
</style>
