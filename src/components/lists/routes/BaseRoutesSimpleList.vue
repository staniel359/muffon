<template>
  <BaseListContainer
    class="selection"
  >
    <RouteItem
      v-for="routeData in routes"
      :key="routeData.uuid"
      :route-data="routeData"
    />
  </BaseListContainer>
</template>

<script>
import BaseListContainer
  from '@/components/containers/lists/BaseListContainer.vue'
import RouteItem from './BaseRoutesSimpleList/RouteItem.vue'

export default {
  name: 'BaseRoutesSimpleList',
  components: {
    BaseListContainer,
    RouteItem
  },
  props: {
    routes: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
