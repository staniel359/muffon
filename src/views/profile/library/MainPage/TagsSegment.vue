<template>
  <BaseProfileLibraryPaginatedSegmentContainer
    :profile-id="profileId"
    :scope="scope"
    :limit="limit"
    :header-link="headerLink"
  >
    <template
      #default="slotProps"
    >
      <BaseTagsSimpleList
        :tags="slotProps[scope]"
        :profile-id="profileId"
        is-link-to-library
        is-with-artists-count
      />
    </template>
  </BaseProfileLibraryPaginatedSegmentContainer>
</template>

<script>
import BaseProfileLibraryPaginatedSegmentContainer
  from '@/components/containers/segments/profile/library/BaseProfileLibraryPaginatedSegmentContainer.vue'
import BaseTagsSimpleList from '@/components/lists/tags/BaseTagsSimpleList.vue'
import {
  tags as formatProfileLibraryTagsLink
} from '@/helpers/formatters/links/profile/library'

export default {
  name: 'TagsSegment',
  components: {
    BaseProfileLibraryPaginatedSegmentContainer,
    BaseTagsSimpleList
  },
  props: {
    profileId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      limit: 20,
      scope: 'tags'
    }
  },
  computed: {
    headerLink () {
      return formatProfileLibraryTagsLink(
        {
          profileId: this.profileId
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
