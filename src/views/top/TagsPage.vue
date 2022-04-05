<template>
  <BaseTopPaginatedPageContainer
    scope="tags"
    :limit="limit"
  >
    <template #default="slotProps">
      <BaseTagsList
        :tags="slotProps.tags"
      />
    </template>
  </BaseTopPaginatedPageContainer>
</template>

<script>
import BaseTopPaginatedPageContainer
  from '*/components/containers/pages/top/BaseTopPaginatedPageContainer.vue'
import BaseTagsList from '*/components/lists/tags/BaseTagsList.vue'

export default {
  name: 'TagsPage',
  components: {
    BaseTopPaginatedPageContainer,
    BaseTagsList
  },
  data () {
    return {
      limit: 100
    }
  }
}
</script>

<style lang="sass" scoped></style>
