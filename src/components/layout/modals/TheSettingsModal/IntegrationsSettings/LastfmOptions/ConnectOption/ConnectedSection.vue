<template>
  <BaseErrorMessage
    v-if="error"
    class="error-message"
    :error="error"
  />

  <div class="option">
    <div class="option-header">
      <BaseButton
        class="red basic circular option-button"
        icon="lastfm"
        :class="{
          loading: isLoading,
          disabled: isLoading
        }"
        :text="disconnectText"
        :is-invertable="false"
        @click="handleClick"
      />
    </div>

    <BaseAccountSection
      :account-data="lastfmAccountData"
    />
  </div>
</template>

<script>
import BaseErrorMessage from '@/components/messages/BaseErrorMessage.vue'
import BaseButton from '@/components/buttons/BaseButton.vue'
import BaseAccountSection from '@/components/sections/BaseAccountSection.vue'
import deleteLastfmConnection
  from '@/helpers/actions/api/connection/lastfm/delete'
import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'

export default {
  name: 'ConnectedSection',
  components: {
    BaseErrorMessage,
    BaseButton,
    BaseAccountSection
  },
  props: {
    lastfmAccountData: Object
  },
  emits: [
    'success'
  ],
  data () {
    return {
      connectionsData: null,
      error: null,
      isLoading: false,
      isSuccess: false
    }
  },
  computed: {
    disconnectText () {
      return this.$t(
        'connections.disconnect'
      )
    }
  },
  watch: {
    connectionsData: 'handleConnectionsDataChange'
  },
  methods: {
    deleteLastfmConnection,
    handleClick () {
      this.deleteLastfmConnection()
    },
    handleConnectionsDataChange (
      value
    ) {
      if (value) {
        updateGlobalStore(
          {
            'profile.connections': value
          }
        )

        this.$emit(
          'success'
        )
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
