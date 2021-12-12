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
      <BaseHeader
        tag="h5"
        :text="sourceName"
      />
    </div>

    <div class="description extra">
      {{ bitrateText }}
    </div>
  </div>
</template>

<script>
import BaseIcon from '@/BaseIcon.vue'
import BaseHeader from '@/BaseHeader.vue'
import { updateStore } from '#/actions'

export default {
  name: 'SourceItem',
  components: {
    BaseIcon,
    BaseHeader
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
    bitrateText () {
      return `~ ${this.maxBitrate}`
    },
    maxBitrate () {
      return this.sourceData.maxBitrate
    }
  },
  methods: {
    handleClick () {
      updateStore({
        'player.sourceId': this.sourceId
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
