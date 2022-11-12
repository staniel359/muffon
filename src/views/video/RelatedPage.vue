<template>
  <BaseVideoPaginatedPageContainer
    ref="page"
    :video-id="videoId"
    :scope="scope"
    :limit="limit"
  >
    <template
      #default="slotProps"
    >
      <BaseVideosTableList
        :videos="slotProps[scope]"
        is-with-share-option
      />
    </template>
  </BaseVideoPaginatedPageContainer>
</template>

<script>
import BaseVideoPaginatedPageContainer
  from '@/components/containers/pages/video/BaseVideoPaginatedPageContainer.vue'
import BaseVideosTableList
  from '@/components/lists/videos/BaseVideosTableList.vue'

export default {
  name: 'RelatedPage',
  components: {
    BaseVideoPaginatedPageContainer,
    BaseVideosTableList
  },
  props: {
    videoId: String
  },
  data () {
    return {
      limit: 40,
      scope: 'related'
    }
  }
}
</script>

<style lang="sass" scoped></style>
