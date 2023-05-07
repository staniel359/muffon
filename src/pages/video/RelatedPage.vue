<template>
  <BaseVideoPaginatedPageContainer
    ref="page"
    :key="refreshKey"
    :video-id="videoId"
    :scope="scope"
    :limit="limit"
    :view-id="viewId"
    is-with-top-segment
    is-with-view-change
  >
    <template
      #default="slotProps"
    >
      <BaseVideosList
        :videos="slotProps[scope]"
        :view-id="viewId"
        is-with-favorite-option
        is-with-bookmark-option
        is-with-watched-option
        is-with-share-option
        is-with-external-link-option
      />
    </template>
  </BaseVideoPaginatedPageContainer>
</template>

<script>
import BaseVideoPaginatedPageContainer
  from '@/components/containers/pages/video/BaseVideoPaginatedPageContainer.vue'
import BaseVideosList from '@/components/lists/videos/BaseVideosList.vue'
import viewChangeMixin from '@/mixins/viewChangeMixin'
import pageMixin from '@/mixins/pageMixin'

export default {
  name: 'RelatedPage',
  components: {
    BaseVideoPaginatedPageContainer,
    BaseVideosList
  },
  mixins: [
    viewChangeMixin,
    pageMixin
  ],
  props: {
    videoId: String
  },
  data () {
    return {
      scope: 'related',
      listScope: 'videos'
    }
  }
}
</script>

<style lang="sass" scoped></style>
