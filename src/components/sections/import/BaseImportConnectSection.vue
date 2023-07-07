<template>
  <div class="main-import-connect-section">
    <BaseErrorMessage
      v-if="error"
      class="error-section"
      :error="error"
    />

    <div class="top-section">
      <div class="button-info-section">
        <ImportButton
          :source="source"
          :is-loading="isLoading"
          :is-user-data="!!userData"
          @click="handleImportButtonClick"
        />

        <Component
          :is="infoComponent"
          v-if="isWithInfo"
        />
      </div>

      <BaseClearButton
        v-if="userData"
        @click="handleClearButtonClick"
      />
    </div>
  </div>
</template>

<script>
import BaseErrorMessage from '@/components/messages/BaseErrorMessage.vue'
import ImportButton from './BaseImportConnectSection/ImportButton.vue'
import BaseClearButton from '@/components/buttons/BaseClearButton.vue'
import LastfmInfoSection
  from './BaseImportConnectSection/info/LastfmInfoSection.vue'
import getUser from '@/helpers/actions/api/user/get'

export default {
  name: 'BaseImportConnectSection',
  components: {
    BaseErrorMessage,
    ImportButton,
    BaseClearButton,
    LastfmInfoSection
  },
  inject: [
    'import',
    'reset'
  ],
  props: {
    source: {
      type: String,
      required: true
    },
    isWithInfo: Boolean
  },
  data () {
    return {
      userData: null,
      error: null,
      isLoading: false,
      infoComponentsData: {
        lastfm: 'LastfmInfoSection'
      }
    }
  },
  computed: {
    userArgs () {
      return {
        source: this.source
      }
    },
    infoComponent () {
      return this.infoComponentsData[
        this.source
      ]
    }
  },
  watch: {
    userData: 'handleUserDataChange'
  },
  methods: {
    getUser,
    handleImportButtonClick () {
      this.getUser(
        this.userArgs
      )
    },
    handleUserDataChange (
      value
    ) {
      this.import(
        {
          userData: value,
          source: this.source
        }
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

<style lang="sass" scoped></style>
