<template>
  <BaseSegmentContainer
    class="main-popup-content-container"
  >
    <BaseAudioEqualizer
      :key="key"
    />
  </BaseSegmentContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseAudioEqualizer from '@/components/audio/BaseAudioEqualizer.vue'
import {
  generateKey
} from '@/helpers/utils'

export default {
  name: 'BaseAudioEqualizerPopup',
  components: {
    BaseSegmentContainer,
    BaseAudioEqualizer
  },
  data () {
    return {
      key: null
    }
  },
  computed: {
    ...mapState(
      profileStore,
      {
        profileLanguage: 'language'
      }
    )
  },
  watch: {
    profileLanguage:
      'handleProfileLanguageChange'
  },
  methods: {
    handleProfileLanguageChange () {
      this.key = generateKey()
    }
  }
}
</script>

<style lang="sass" scoped></style>
