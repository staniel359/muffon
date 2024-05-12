<template>
  <BaseTopPaginatedPageContainer
    :key="refreshKey"
    :scope="scope"
    :limit="limit"
    is-with-top-segment
    is-with-country-select
    is-with-reload-button
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
import pageMixin from '@/mixins/pageMixin'

export default {
  name: 'TagsPage',
  components: {
    BaseTopPaginatedPageContainer,
    BaseTagsSimpleList
  },
  mixins: [
    pageMixin
  ],
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
