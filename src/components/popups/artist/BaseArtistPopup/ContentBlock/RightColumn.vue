<template>
  <div class="main-right-column small">
    <HeaderSection
      :artist-data="artistData"
      @link-click="handleLinkClick"
    />

    <LabelsSection
      :artist-data="artistData"
      @link-click="handleLinkClick"
    />
  </div>
</template>

<script>
import HeaderSection from './RightColumn/HeaderSection.vue'
import LabelsSection from './RightColumn/LabelsSection.vue'

export default {
  name: 'RightColumn',
  components: {
    HeaderSection,
    LabelsSection
  },
  props: {
    artistData: Object
  },
  emits: [
    'linkClick'
  ],
  methods: {
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
