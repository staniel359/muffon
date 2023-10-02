<template>
  <div class="item navigation-container flex-full text-overflow-hidden">
    <div
      class="ui large breadcrumb navigation absolute no-right"
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
  padding-right: 0 !important
  padding-left: 0 !important
  margin: 0 1rem

.navigation
  min-width: 100%
</style>
