<template>
  <div>
    <BaseErrorMessage
      v-if="error"
      class="connect-error"
      :error="error"
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
          :text="importText"
          @click="handleClick"
        />
      </div>

      <BaseClearButton
        v-if="userData"
        @click="handleResetButtonClick"
      />
    </div>

    <template v-if="userData">
      <BaseDivider />

      <UserInfoSection
        :user-data="userData"
      />
    </template>
  </div>
</template>

<script>
import BaseErrorMessage from '*/components/messages/BaseErrorMessage.vue'
import BaseButton from '*/components/buttons/BaseButton.vue'
import BaseClearButton from '*/components/buttons/BaseClearButton.vue'
import BaseDivider from '*/components/BaseDivider.vue'
import UserInfoSection from './ConnectSection/UserInfoSection.vue'
import getLastfmUser from '*/helpers/actions/api/lastfm/user/get'

export default {
  name: 'ConnectSection',
  components: {
    BaseErrorMessage,
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
      userData: null,
      isLoading: false
    }
  },
  computed: {
    importText () {
      return this.$t(
        'actions.account.import.lastfm'
      )
    },
    isDisabled () {
      return (
        this.isLoading ||
          !!this.userData
      )
    }
  },
  watch: {
    userData: 'handleUserDataChange'
  },
  methods: {
    handleClick () {
      this.getLastfmUser()
    },
    handleUserDataChange (
      value
    ) {
      this.$emit(
        'userDataChange',
        value
      )

      this.setStatus(
        'import'
      )
    },
    handleResetButtonClick () {
      this.error = null
      this.userData = null
    },
    getLastfmUser
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
