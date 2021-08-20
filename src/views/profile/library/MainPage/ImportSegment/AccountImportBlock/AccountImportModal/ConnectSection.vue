<template>
  <div>
    <BaseError
      class="connect-error"
      v-if="error"
      :error="error"
      :isWithButton="false"
    />

    <div class="connect-block-container">
      <div class="connect-button-container">
        <BaseButton
          class="lastfm connect-button"
          icon="lastfm"
          :class="{
            loading: isLoading,
            disabled: isDisabled
          }"
          :text="textFormatted"
          @click="handleClick"
        />
      </div>

      <BaseClearButton
        v-if="!isReset"
        @click="handleResetButtonClick"
      />
    </div>

    <template v-if="userData">
      <BaseDivider />

      <UserInfoSection
        :userData="userData"
      />
    </template>
  </div>
</template>

<script>
import BaseError from '@/BaseError.vue'
import BaseButton from '@/BaseButton.vue'
import BaseClearButton from '@/BaseClearButton.vue'
import BaseDivider from '@/BaseDivider.vue'
import UserInfoSection from './ConnectSection/UserInfoSection.vue'
import fetchLastfmTokenData from '#/actions/api/lastfm/connect/token/fetchData'
import fetchLastfmSessionData
  from '#/actions/api/lastfm/connect/session/fetchData'
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'ConnectSection',
  components: {
    BaseError,
    BaseButton,
    BaseClearButton,
    BaseDivider,
    UserInfoSection
  },
  inject: [
    'setStatus'
  ],
  emits: [
    'userDataChange'
  ],
  data () {
    return {
      error: null,
      token: null,
      userData: null,
      isLoading: false,
      isReset: true
    }
  },
  computed: {
    textFormatted () {
      if (this.token) {
        return localize(
          'pages.library.add.account.import.lastfm'
        )
      } else {
        return localize(
          'pages.library.add.account.connect.lastfm'
        )
      }
    },
    isDisabled () {
      return !!this.userData
    }
  },
  watch: {
    userData: 'handleUserDataChange'
  },
  methods: {
    fetchLastfmTokenData,
    fetchLastfmSessionData,
    handleUserDataChange (value) {
      this.$emit(
        'userDataChange',
        value
      )

      this.setStatus('import')
    },
    handleClick () {
      if (this.token) {
        this.fetchLastfmSessionData({
          token: this.token
        })
      } else {
        this.fetchLastfmTokenData()
      }
    },
    handleResetButtonClick () {
      this.error = null
      this.token = null
      this.userData = null
      this.isReset = true
    }
  }
}
</script>

<style lang="sass" scoped>
.connect-error
  margin-bottom: 1em !important

.connect-block-container
  @extend .d-flex, .align-items-center

.connect-button-container
  @extend .flex-full

.connect-button
  @extend .no-margin
</style>
