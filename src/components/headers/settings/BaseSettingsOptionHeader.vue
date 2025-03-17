<template>
  <div class="middle-aligned main-settings-option-header">
    <BaseHeader
      tag="h4"
      :text="text"
    />

    <BaseLabel
      v-if="isBeta"
      class="primary small circular main-right-small-section beta-label"
      :text="betaText"
      :is-invertable="false"
    />
  </div>
</template>

<script>
import BaseHeader from '@/components/headers/BaseHeader.vue'
import BaseLabel from '@/components/labels/BaseLabel.vue'

export default {
  name: 'BaseSettingsOptionHeader',
  components: {
    BaseHeader,
    BaseLabel
  },
  props: {
    text: {
      type: String,
      required: true
    },
    isBeta: Boolean
  },
  computed: {
    betaText () {
      return 'Beta'
    }
  }
}
</script>

<style lang="sass" scoped></style>
