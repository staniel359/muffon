<template>
  <div class="main-settings-option-container">
    <BaseMessage
      class="main-top-section main-formatted-text-container"
      :content="descriptionText"
    />

    <BaseFormContainer
      :options="formOptions"
    >
      <BaseFormInputContainer
        class="fluid"
      >
        <input
          ref="clientIdInput"
          v-model.trim="clientId"
          type="text"
          name="client-id"
          :placeholder="clientIdText"
        >
      </BaseFormInputContainer>

      <BaseFormInputContainer
        class="fluid"
      >
        <input
          v-model.trim="clientSecret"
          type="text"
          name="client-secret"
          :placeholder="clientSecretText"
        >
      </BaseFormInputContainer>

      <div class="main-settings-option main-bottom-section">
        <div class="option-header">
          <BaseSubmitButton
            action-key="openLink"
            is-basic
            :is-with-icon="false"
          />
        </div>

        <BaseClearButton
          @click="handleClearButtonClick"
        />
      </div>
    </BaseFormContainer>
  </div>
</template>

<script>
import axios from 'axios'
import {
  shell
} from 'electron'
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BaseMessage from '@/components/messages/BaseMessage.vue'
import BaseFormContainer from '@/components/containers/forms/BaseFormContainer.vue'
import BaseFormInputContainer
  from '@/components/containers/inputs/form/BaseFormInputContainer.vue'
import BaseSubmitButton from '@/components/buttons/BaseSubmitButton.vue'
import BaseClearButton from '@/components/buttons/BaseClearButton.vue'
import spotifyLinkFormOptions
  from '@/helpers/formatters/plugins/semantic/options/form/spotifyLink'
import {
  spotifyConnectionInstructionsLink
} from '@/helpers/data/externalLinks'

export default {
  name: 'LinkSection',
  components: {
    BaseMessage,
    BaseFormContainer,
    BaseFormInputContainer,
    BaseSubmitButton,
    BaseClearButton
  },
  emits: [
    'clearButtonClick',
    'openLinkButtonClick'
  ],
  data () {
    return {
      clientId: null,
      clientSecret: null,
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
    formOptions () {
      return spotifyLinkFormOptions(
        {
          onSuccess: this.handleSuccess
        }
      )
    },
    codeLink () {
      return (
        'https://accounts.spotify.com' +
          `/${this.profileLanguage}/authorize` +
          `?client_id=${this.clientId}` +
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
    },
    descriptionText () {
      return this.$t(
        'settings.options.connections.spotify.link.description',
        {
          instructionsLink:
            spotifyConnectionInstructionsLink,
          redirectLink:
            this.redirectLink
        }
      )
    },
    clientIdText () {
      return this.$t(
        'forms.fields.clientId'
      )
    },
    clientSecretText () {
      return this.$t(
        'forms.fields.clientSecret'
      )
    }
  },
  mounted () {
    this.focusClientIdInput()
  },
  methods: {
    handleClearButtonClick () {
      this.$emit(
        'clearButtonClick'
      )
    },
    handleSuccess () {
      shell.openExternal(
        this.codeLink
      )

      this.$emit(
        'openLinkButtonClick',
        {
          clientId: this.clientId,
          clientSecret: this.clientSecret
        }
      )
    },
    focusClientIdInput () {
      this
        .$refs
        .clientIdInput
        .focus()
    }
  }
}
</script>

<style lang="sass" scoped></style>
