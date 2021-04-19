<template>
  <BasePageContainer
    class="page-container"
    @init="handleContainerInit"
  >
    <template #default="pageSlotProps">
      <LeftColumn
        :artistName="pageSlotProps.artistName"
        :scrollable="container"
      />
      <RightColumn :artistName="pageSlotProps.artistName" />
    </template>
  </BasePageContainer>
</template>

<script>
import BasePageContainer from '@/containers/pages/artist/BasePageContainer.vue'
import LeftColumn from './MainPage/LeftColumn.vue'
import RightColumn from './MainPage/RightColumn.vue'

export default {
  name: 'MainPage',
  components: {
    BasePageContainer,
    LeftColumn,
    RightColumn
  },
  data () {
    return {
      container: null
    }
  },
  methods: {
    handleContainerInit (el) {
      this.container = el
    }
  }
}
</script>

<style lang="sass" scoped>
.page-container
  @extend .d-flex
</style>
