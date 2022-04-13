<template>
  <BaseTopPaginatedSegmentContainer
    :scope="scope"
    :limit="limit"
    :header-link="headerLink"
  >
    <template #default="slotProps">
      <BaseTagsList
        :tags="slotProps[scope]"
      />
    </template>
  </BaseTopPaginatedSegmentContainer>
</template>

<script>
import BaseTopPaginatedSegmentContainer
  from '*/components/containers/segments/top/BaseTopPaginatedSegmentContainer.vue'
import BaseTagsList from '*/components/lists/tags/BaseTagsList.vue'
import {
  tags as formatTopTagsLink
} from '*/helpers/formatters/links/top'

export default {
  name: 'TagsSegment',
  components: {
    BaseTopPaginatedSegmentContainer,
    BaseTagsList
  },
  data () {
    return {
      limit: 20,
      scope: 'tags'
    }
  },
  computed: {
    headerLink () {
      return formatTopTagsLink()
    }
  }
}
</script>

<style lang="sass" scoped></style>
