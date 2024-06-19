<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseHeader
        class="option-header"
        tag="h4"
        :text="cacheText"
      />

      <BaseToggle
        store-key="system.isWithCache"
        :is-checked="isWithCache"
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

export default {
  name: 'CacheOption',
  components: {
    BaseHeader,
    BaseToggle,
    BaseMessage
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
        'isWithCache'
      ]
    ),
    cacheText () {
      return this.$t(
        'settings.options.app.system.cache.enable'
      )
    },
    restartText () {
      return this.$t(
        'messages.restartToApply'
      )
    }
  },
  watch: {
    isWithCache: 'handleIsWithCacheChange'
  },
  methods: {
    handleIsWithCacheChange () {
      this.isShowRestartMessage = true
    }
  }
}
</script>

<style lang="sass" scoped></style>
