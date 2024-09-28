<template>
  <BaseMessage
    v-if="isAutoupdateBeta"
    class="main-bottom-section"
    :header="warningMessageHeader"
    :content="warningMessageContent"
    is-warning
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import updatesStore from '@/stores/updates'
import BaseMessage from '@/components/messages/BaseMessage.vue'
import formatI18nTextWithExternalLink
  from '@/helpers/formatters/i18n/textWithExternalLink'

export default {
  name: 'AutoupdateBetaWarningMessage',
  components: {
    BaseMessage
  },
  data () {
    return {
      issueLink: 'https://github.com/staniel359/muffon/issues/191'
    }
  },
  computed: {
    ...mapState(
      updatesStore,
      [
        'isAutoupdateBeta'
      ]
    ),
    warningMessageHeader () {
      return `${this.warningMessageHeaderText}!`
    },
    warningMessageHeaderText () {
      return this.$t(
        'warning'
      )
    },
    warningMessageContent () {
      return formatI18nTextWithExternalLink(
        {
          text: this.warningMessageContentText,
          linksData: {
            issue: this.issueLink
          },
          className: 'active bold underlined'
        }
      )
    },
    warningMessageContentText () {
      return this.$t(
        'settings.options.app.updates.autoWarning'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
