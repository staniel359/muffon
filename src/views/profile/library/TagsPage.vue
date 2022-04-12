<template>
  <BaseProfileLibraryPaginatedPageContainer
    :profileId="profileId"
    :scope="scope"
    :limit="limit"
    isWithSearch
  >
    <template #default="slotProps">
      <BaseTagsList
        :tags="slotProps[scope]"
        :profileId="profileId"
        isLinkToLibrary
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
