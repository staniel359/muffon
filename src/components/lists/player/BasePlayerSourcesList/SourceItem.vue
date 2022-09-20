<template>
  <div
    class="item main-dropdown-item"
    :data-value="source"
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

    <div
      class="description extra"
      v-text="bitrateText"
    />
  </div>
</template>

<script>
import BaseIcon from '@/components/BaseIcon.vue'
import BaseHeader from '@/components/BaseHeader.vue'

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
  emits: [
    'select'
  ],
  computed: {
    source () {
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
      this.$emit(
        'select',
        this.source
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
