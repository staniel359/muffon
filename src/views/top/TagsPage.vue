<template>
  <BaseTopPaginatedPageContainer
    scope="tags"
    :clientPageLimit="100"
    :responsePageLimit="100"
  >
    <template #default="slotProps">
      <BaseTagsList
        :tags="slotProps.tags"
        :isWithIcon="false"
      />
    </template>
  </BaseTopPaginatedPageContainer>
</template>

<script>
import BaseTopPaginatedPageContainer
  from '@/containers/pages/top/BaseTopPaginatedPageContainer.vue'
import BaseTagsList from '@/lists/tags/BaseTagsList.vue'

export default {
  name: 'TagsPage',
  components: {
    BaseTopPaginatedPageContainer,
    BaseTagsList
  }
}
</script>

<style lang="sass" scoped></style>
