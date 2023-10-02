<template>
  <div class="main-settings-option-container">
    <div
      v-if="error"
      class="main-top-section"
    >
      <BaseErrorMessage
        :error="error"
      />
    </div>

    <div class="main-settings-option">
      <div class="option-header">
        <BaseButton
          class="green basic circular option-button"
          left-icon="spotify"
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
  </div>
</template>

<script>
import BaseErrorMessage from '@/components/messages/BaseErrorMessage.vue'
import BaseButton from '@/components/buttons/BaseButton.vue'
import BaseAccountSection from '@/components/sections/BaseAccountSection.vue'
import deleteConnection from '@/helpers/actions/api/connection/delete'
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
    },
    connectionArgs () {
      return {
        source: 'spotify'
      }
    }
  },
  watch: {
    connectionsData:
      'handleConnectionsDataChange'
  },
  methods: {
    deleteConnection,
    handleClick () {
      this.deleteConnection(
        this.connectionArgs
      )
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
