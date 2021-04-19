<template>
  <i
    v-if="!isFirstSection"
    class="right chevron icon divider"
  />

  <RouterLink
    v-if="link"
    class="section main-link"
    :class="{ active: isActive }"
    :to="link"
  >
    {{ sectionName }}
  </RouterLink>
  <div
    v-else
    class="section"
    :class="{ active: isActive }"
  >
    {{ sectionName }}
  </div>
</template>

<script>
export default {
  name: 'NavigationSection',
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
