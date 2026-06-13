<template>
  <BaseProfileLibraryTabContainer
    :profile-id="profileId"
    :scope="scope"
    :limit="limit"
    :is-active="isActive"
    :is-activated="isActivated"
    @focus="handleFocus"
  >
    <template
      #default="slotProps"
    >
      <BaseTagsSimpleList
        :[scope]="slotProps[scope]"
        :profile-id="profileId"
        is-link-to-library
        is-with-artists-count
      />
    </template>
  </BaseProfileLibraryTabContainer>
</template>

<script>
import BaseProfileLibraryTabContainer
  from '@/components/containers/tabs/profile/library/BaseProfileLibraryTabContainer.vue'
import BaseTagsSimpleList from '@/components/lists/tags/BaseTagsSimpleList.vue'

import {
  tags as tagsLimits
} from '@/helpers/data/limits'

import tabMixin from '@/mixins/tabMixin'

export default {
  name: 'TagsTab',
  components: {
    BaseProfileLibraryTabContainer,
    BaseTagsSimpleList
  },
  mixins: [
    tabMixin
  ],
  props: {
    profileId: Number
  },
  emits: [
    'focus'
  ],
  data () {
    return {
      scope: 'tags',
      limit:
        tagsLimits.simple.extrasmall
    }
  },
  methods: {
    handleFocus () {
      this.$emit(
        'focus'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
