<template>
  <BaseTopTabContainer
    :scope="scope"
    :limit="limit"
    :country="country"
    :is-active="isActive"
    @focus="handleFocus"
  >
    <template
      #default="slotProps"
    >
      <BaseTagsSimpleList
        :tags="slotProps[scope]"
      />
    </template>
  </BaseTopTabContainer>
</template>

<script>
import BaseTopTabContainer
  from '@/components/containers/tabs/top/BaseTopTabContainer.vue'
import BaseTagsSimpleList from '@/components/lists/tags/BaseTagsSimpleList.vue'
import {
  tags as tagsLimits
} from '@/helpers/data/limits'
import tabMixin from '@/mixins/tabMixin'

export default {
  name: 'TagsTab',
  components: {
    BaseTopTabContainer,
    BaseTagsSimpleList
  },
  mixins: [
    tabMixin
  ],
  props: {
    country: String
  },
  data () {
    return {
      limit:
        tagsLimits.simple.medium,
      scope: 'tags'
    }
  }
}
</script>

<style lang="sass" scoped></style>
