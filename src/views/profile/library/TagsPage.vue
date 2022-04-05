<template>
  <BaseProfileLibraryPaginatedPageContainer
    scope="tags"
    :profileId="profileId"
    :limit="limit"
    isWithSearch
  >
    <template #default="slotProps">
      <BaseTagsList
        :tags="slotProps.tags"
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
      limit: 100
    }
  }
}
</script>

<style lang="sass" scoped></style>
