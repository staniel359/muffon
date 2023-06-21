<template>
  <BaseErrorMessage
    v-if="error"
    class="error-message"
    :error="error"
  />

  <div class="option">
    <div class="option-header">
      <BaseButton
        class="green basic circular option-button"
        icon="spotify"
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
      :account-data="spotifyAccountData"
    />
  </div>
</template>

<script>
import BaseErrorMessage from '@/components/messages/BaseErrorMessage.vue'
import BaseButton from '@/components/buttons/BaseButton.vue'
import BaseAccountSection from '@/components/sections/BaseAccountSection.vue'
import deleteSpotifyConnection
  from '@/helpers/actions/api/connection/spotify/delete'
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
    spotifyAccountData: Object
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
    connectionsData:
      'handleConnectionsDataChange'
  },
  methods: {
    deleteSpotifyConnection,
    handleClick () {
      this.deleteSpotifyConnection()
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
