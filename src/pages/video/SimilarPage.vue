<template>
  <BaseVideoPaginatedPageContainer
    ref="page"
    :key="refreshKey"
    :video-id="videoId"
    :scope="scope"
    :list-scope="listScope"
    :limit="limit"
    :view-id="viewId"
    is-with-top-segment
    is-with-view-change
    is-with-reload-button
    is-pagination-simple
  >
    <template
      #default="slotProps"
    >
      <BaseVideosList
        :videos="slotProps[scope]"
        :view-id="viewId"
        is-with-channel-title
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
  name: 'SimilarPage',
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
      scope: 'similar',
      listScope: 'videos'
    }
  }
}
</script>

<style lang="sass" scoped></style>
