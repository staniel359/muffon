<template>
  <BaseReleasesPageContainer
    :is-fetch-data="false"
  >
    <NewSegment />

    <UpcomingSegment />
  </BaseReleasesPageContainer>
</template>

<script>
import BaseReleasesPageContainer
  from '*/components/containers/pages/releases/BaseReleasesPageContainer.vue'
import NewSegment from './MainPage/NewSegment.vue'
import UpcomingSegment from './MainPage/UpcomingSegment.vue'

export default {
  name: 'MainPage',
  components: {
    BaseReleasesPageContainer,
    NewSegment,
    UpcomingSegment
  }
}
</script>

<style lang="sass" scoped></style>
