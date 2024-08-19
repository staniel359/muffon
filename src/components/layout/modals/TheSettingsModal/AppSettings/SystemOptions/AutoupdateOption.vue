<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <div class="middle-aligned option-header">
        <BaseHeader
          tag="h4"
          :text="autoupdateText"
        />

        <BaseLabel
          v-if="isBeta"
          class="primary circular small main-right-small-section"
          text="Beta"
          :is-invertable="false"
        />
      </div>

      <BaseToggle
        store-key="system.isWithAutoupdate"
        :is-checked="isWithAutoupdate"
      />
    </div>
  </div>

  <BaseMessage
    v-if="isShowRestartMessage"
    class="main-bottom-section"
    :content="restartText"
    is-info
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import systemStore from '@/stores/system'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseToggle from '@/components/toggles/BaseToggle.vue'
import BaseMessage from '@/components/messages/BaseMessage.vue'
import BaseLabel from '@/components/labels/BaseLabel.vue'
import {
  systemName
} from '@/helpers/data/env'

export default {
  name: 'AutoupdateOption',
  components: {
    BaseHeader,
    BaseToggle,
    BaseMessage,
    BaseLabel
  },
  data () {
    return {
      isShowRestartMessage: false
    }
  },
  computed: {
    ...mapState(
      systemStore,
      [
        'isWithAutoupdate'
      ]
    ),
    autoupdateText () {
      return this.$t(
        'settings.options.app.system.autoupdate'
      )
    },
    restartText () {
      return this.$t(
        'messages.restartToApply'
      )
    },
    isBeta () {
      return (
        systemName === 'linux'
      )
    }
  },
  watch: {
    isWithAutoupdate: 'handleIsWithAutoupdateChange'
  },
  methods: {
    handleIsWithAutoupdateChange () {
      this.isShowRestartMessage = true
    }
  }
}
</script>

<style lang="sass" scoped></style>
