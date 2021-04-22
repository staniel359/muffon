<template>
  <div
    class="item main-dropdown-item"
    :data-value="sourceId"
    @click="handleClick"
  >
    <BaseIcon
      class="colored main-dropdown-icon"
      :icon="icon"
    />

    <div class="content">
      <h5 class="ui header main-header">
        {{ sourceName }}
      </h5>
    </div>

    <div class="description extra">
      {{ maxBitrateFormatted }}
    </div>
  </div>
</template>

<script>
import BaseIcon from '@/BaseIcon.vue'
import { setSourceId as setPlayerSourceId } from '#/actions/player'

export default {
  name: 'SourceItem',
  components: {
    BaseIcon
  },
  props: {
    sourceData: {
      type: Object,
      required: true
    }
  },
  computed: {
    sourceId () {
      return this.sourceData.id
    },
    icon () {
      return this.sourceData.icon
    },
    sourceName () {
      return this.sourceData.name
    },
    maxBitrateFormatted () {
      return `~${this.maxBitrate}`
    },
    maxBitrate () {
      return this.sourceData.maxBitrate
    }
  },
  methods: {
    handleClick () {
      setPlayerSourceId(this.sourceId)
    }
  }
}
</script>

<style lang="sass" scoped></style>
