<template>
  <BaseProfileLibraryPaginatedPageContainer
    :key="refreshKey"
    :profile-id="profileId"
    :scope="scope"
    :limit="limit"
    is-with-top-segment
    is-with-search
    is-with-reload-button
  >
    <template
      #default="slotProps"
    >
      <BaseTagsSimpleList
        :tags="slotProps[scope]"
        :profile-id="profileId"
        is-link-to-library
        is-with-artists-count
      />
    </template>
  </BaseProfileLibraryPaginatedPageContainer>
</template>

<script>
import BaseProfileLibraryPaginatedPageContainer
  from '@/components/containers/pages/profile/library/BaseProfileLibraryPaginatedPageContainer.vue'
import BaseTagsSimpleList from '@/components/lists/tags/BaseTagsSimpleList.vue'
import {
  tags as tagsLimits
} from '@/helpers/data/limits'
import pageMixin from '@/mixins/pageMixin'

export default {
  name: 'TagsPage',
  components: {
    BaseProfileLibraryPaginatedPageContainer,
    BaseTagsSimpleList
  },
  mixins: [
    pageMixin
  ],
  props: {
    profileId: Number
  },
  data () {
    return {
      limit:
        tagsLimits.simple.large,
      scope: 'tags'
    }
  }
}
</script>

<style lang="sass" scoped></style>
