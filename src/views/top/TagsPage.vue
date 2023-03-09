<template>
  <BaseTopPaginatedPageContainer
    :scope="scope"
    :limit="limit"
    is-with-top-segment
    is-with-country-select
  >
    <template
      #default="slotProps"
    >
      <BaseTagsSimpleList
        :tags="slotProps[scope]"
      />
    </template>
  </BaseTopPaginatedPageContainer>
</template>

<script>
import BaseTopPaginatedPageContainer
  from '@/components/containers/pages/top/BaseTopPaginatedPageContainer.vue'
import BaseTagsSimpleList from '@/components/lists/tags/BaseTagsSimpleList.vue'
import {
  tags as tagsLimits
} from '@/helpers/data/limits'

export default {
  name: 'TagsPage',
  components: {
    BaseTopPaginatedPageContainer,
    BaseTagsSimpleList
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
