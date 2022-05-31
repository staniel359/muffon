<template>
  <BaseTopPaginatedPageContainer
    :scope="scope"
    :limit="limit"
    is-with-top-segment
    is-with-country-select
  >
    <template #default="slotProps">
      <BaseTagsList
        :tags="slotProps[scope]"
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
      limit: 100,
      scope: 'tags'
    }
  }
}
</script>

<style lang="sass" scoped></style>
