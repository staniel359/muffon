<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <div class="option-header">
        <BaseButton
          class="green circular option-button"
          left-icon="spotify"
          :text="connectText"
          :is-invertable="false"
          @click="handleClick"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  shell
} from 'electron'
import axios from 'axios'
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BaseButton from '@/components/buttons/BaseButton.vue'
import {
  spotifyClientId
} from '@/helpers/data/env'

export default {
  name: 'CodeSection',
  components: {
    BaseButton
  },
  emits: [
    'codeCalled'
  ],
  data () {
    return {
      scopes: [
        'user-read-private',
        'user-library-read',
        'playlist-read-private'
      ]
    }
  },
  computed: {
    ...mapState(
      profileStore,
      {
        profileLanguage: 'language'
      }
    ),
    connectText () {
      return this.$t(
        'connections.connect'
      )
    },
    codeLink () {
      return (
        'https://accounts.spotify.com' +
          `/${this.profileLanguage}/authorize` +
          `?client_id=${spotifyClientId}` +
          `&redirect_uri=${this.redirectLink}` +
          '&response_type=code' +
          `&scope=${this.scope}`
      )
    },
    redirectLink () {
      return axios
        .defaults
        .baseURL
        .replace(
          '/api/',
          '/code'
        )
    },
    scope () {
      return this.scopes.join(
        ','
      )
    }
  },
  methods: {
    handleClick () {
      shell.openExternal(
        this.codeLink
      )

      this.$emit(
        'codeCalled'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
