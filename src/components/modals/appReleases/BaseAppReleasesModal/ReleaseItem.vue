<template>
  <div class="full-column">
    <BaseHeader
      class="main-link width-fit-content"
      tag="h2"
      :text="version"
      @click="handleVersionClick"
    />

    <BaseTimestampSection
      :created="publishDate"
    />

    <BaseDivider />

    <p
      class="main-formatted-text-container"
      v-text="description"
    />
  </div>

  <BaseDivider
    v-if="!isLastItem"
    class="large"
  />
</template>

<script>
import {
  shell
} from 'electron'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseTimestampSection
  from '@/components/sections/BaseTimestampSection.vue'
import BaseDivider from '@/components/BaseDivider.vue'

export default {
  name: 'ReleaseItem',
  components: {
    BaseHeader,
    BaseTimestampSection,
    BaseDivider
  },
  props: {
    releaseData: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    totalCount: {
      type: Number,
      required: true
    }
  },
  computed: {
    version () {
      return this.releaseData.version
    },
    publishDate () {
      return this.releaseData.publish_date
    },
    description () {
      return this.releaseData.description
    },
    link () {
      return this.releaseData.link
    },
    isLastItem () {
      return (
        this.index ===
          this.lastIndex
      )
    },
    lastIndex () {
      return (
        this.totalCount - 1
      )
    }
  },
  methods: {
    handleVersionClick () {
      shell.openExternal(
        this.link
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
