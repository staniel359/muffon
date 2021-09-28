<template>
  <BaseTopPaginatedSegmentContainer
    scope="tags"
    :clientPageLimit="20"
    :responsePageLimit="20"
  >
    <template #default="slotProps">
      <BaseTagsList
        :tags="slotProps.tags"
        :isWithIcon="false"
      />
    </template>
  </BaseTopPaginatedSegmentContainer>
</template>

<script>
import BaseTopPaginatedSegmentContainer
  from '@/containers/pages/top/BaseTopPaginatedSegmentContainer.vue'
import BaseTagsList from '@/lists/tags/BaseTagsList.vue'

export default {
  name: 'TagsSegment',
  components: {
    BaseTopPaginatedSegmentContainer,
    BaseTagsList
  }
}
</script>

<style lang="sass" scoped></style>
