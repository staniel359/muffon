<template>
  <RouterLink
    class="item main-simple-list-item middle-aligned"
    :to="link"
  >
    <BaseIcon
      class="left-icon main-icon"
      :icon="icon"
    />

    <div class="content">
      <div
        v-text="title"
      />
    </div>

    <BaseCreatedSection
      class="description right"
      :model-data="routeData"
    />
  </RouterLink>
</template>

<script>
import BaseIcon from '@/components/icons/BaseIcon.vue'
import BaseCreatedSection from '@/components/sections/BaseCreatedSection.vue'
import routes from '@/plugins/router/routes'

export default {
  name: 'RouteItem',
  components: {
    BaseIcon,
    BaseCreatedSection
  },
  props: {
    routeData: {
      type: Object,
      required: true
    }
  },
  computed: {
    link () {
      return this.routeDataFormatted.link
    },
    routeDataFormatted () {
      return this.routeDataFormatter(
        this.routeExtraData
      )
    },
    routeDataFormatter () {
      return this.matchedRouteData
        .meta
        .formatter
    },
    matchedRouteData () {
      return routes.find(
        this.isMatchedRoute
      )
    },
    routeExtraData () {
      return this.routeData.data
    },
    icon () {
      return this.routeDataFormatted.icon
    },
    title () {
      return this.routeDataFormatted.title
    }
  },
  methods: {
    isMatchedRoute (
      routeData
    ) {
      return (
        routeData.name ===
          this.routeData.name
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
