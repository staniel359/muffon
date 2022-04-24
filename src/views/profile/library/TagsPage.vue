<template>
  <BaseProfileLibraryPaginatedPageContainer
    :profile-id="profileId"
    :scope="scope"
    :limit="limit"
    is-with-top-segment
    is-with-search
  >
    <template #default="slotProps">
      <BaseTagsList
        :tags="slotProps[scope]"
        :profile-id="profileId"
        is-link-to-library
      />
    </template>
  </BaseProfileLibraryPaginatedPageContainer>
</template>

<script>
import BaseProfileLibraryPaginatedPageContainer
  from '*/components/containers/pages/profile/library/BaseProfileLibraryPaginatedPageContainer.vue'
import BaseTagsList from '*/components/lists/tags/BaseTagsList.vue'

export default {
  name: 'TagsPage',
  components: {
    BaseProfileLibraryPaginatedPageContainer,
    BaseTagsList
  },
  props: {
    profileId: String
  },
  data () {
    return {
      limit: 100,
      scope: 'tags'
    }
  }
}
</script>

<style lang="sass" scoped></style>
