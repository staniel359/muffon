<template>
  <div class="item navigation-container">
    <div
      class="ui large breadcrumb"
      :class="{ inverted: isDarkMode }"
    >
      <NavigationSection
        v-for="(sectionData, index) in navigationSectionsCollection"
        :key="sectionData.uuid"
        :sectionData="sectionData"
        :index="index"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import NavigationSection from './NavbarNavigation/NavigationSection.vue'
import { collection as formatCollection } from '#/formatters'

export default {
  name: 'NavbarNavigation',
  components: {
    NavigationSection
  },
  computed: {
    ...mapState('layout', [
      'navigationSections',
      'isDarkMode'
    ]),
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
</style>
