<template>
  <BaseIcon
    v-if="!isFirstSection"
    class="navigation-icon"
    icon="navigationRight"
    is-with-rtl
  />

  <BaseLink
    v-if="link"
    class="section"
    :class="{
      active: isActive
    }"
    :link="link"
    :text="sectionName"
  />
  <div
    v-else
    class="section"
    :class="{
      active: isActive
    }"
    v-text="sectionName"
  />
</template>

<script>
import BaseIcon from '@/components/icons/BaseIcon.vue'
import BaseLink from '@/components/links/BaseLink.vue'

export default {
  name: 'NavigationSection',
  components: {
    BaseIcon,
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

<style lang="sass" scoped>
.navigation-icon
  margin: 0 0.5rem !important
</style>
