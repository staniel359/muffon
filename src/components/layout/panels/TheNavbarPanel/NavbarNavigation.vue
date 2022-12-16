<template>
  <div class="item navigation-container">
    <div
      class="ui large breadcrumb navigation"
      :class="{
        inverted: isDarkMode
      }"
    >
      <NavigationSection
        v-for="(sectionData, index) in navigationSectionsCollection"
        :key="sectionData.uuid"
        :section-data="sectionData"
        :index="index"
      />
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import NavigationSection from './NavbarNavigation/NavigationSection.vue'
import {
  collection as formatCollection
} from '@/helpers/formatters'

export default {
  name: 'NavbarNavigation',
  components: {
    NavigationSection
  },
  computed: {
    ...mapState(
      layoutStore,
      [
        'navigationSections',
        'isDarkMode'
      ]
    ),
    navigationSectionsCollection () {
      return formatCollection(
        this.navigationSections
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.navigation-container
  @extend .flex-full, .overflow-hidden, .white-space-no-wrap
  padding-right: 0 !important
  padding-left: 0 !important
  margin: 0 1em

.navigation
  @extend .absolute
  min-width: 100%
  right: 0
</style>
