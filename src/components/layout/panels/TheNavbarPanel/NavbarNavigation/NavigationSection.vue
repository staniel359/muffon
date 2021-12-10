<template>
  <i
    v-if="!isFirstSection"
    class="right chevron icon divider"
  />

  <BaseLink
    v-if="link"
    class="section"
    :class="{ active: isActive }"
    :link="link"
    :text="sectionName"
  />
  <div
    v-else
    class="section"
    :class="{ active: isActive }"
  >
    {{ sectionName }}
  </div>
</template>

<script>
import BaseLink from '@/links/BaseLink.vue'

export default {
  name: 'NavigationSection',
  components: {
    BaseLink
  },
  props: {
    sectionData: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  computed: {
    isFirstSection () {
      return this.index === 0
    },
    link () {
      return this.sectionData.link
    },
    isActive () {
      return this.sectionData.isActive
    },
    sectionName () {
      return this.sectionData.name
    }
  }
}
</script>

<style lang="sass" scoped></style>
