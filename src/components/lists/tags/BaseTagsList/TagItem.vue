<template>
  <BaseLabelLinkContainer
    :link="link"
  >
    <span class="link">
      {{ tagName }}
    </span>

    <div
      v-if="tagCount"
      class="detail"
    >
      <i class="microphone icon"></i>
      {{ tagCount }}
    </div>
  </BaseLabelLinkContainer>
</template>

<script>
import BaseLabelLinkContainer
  from '*/components/containers/links/BaseLabelLinkContainer.vue'
import { main as formatTagMainLink } from '*/helpers/formatters/links/tag'
import {
  main as formatProfileLibraryTagMainLink
} from '*/helpers/formatters/links/profile/library/tag'

export default {
  name: 'TagItem',
  components: {
    BaseLabelLinkContainer
  },
  props: {
    tagData: {
      type: Object,
      required: true
    },
    isLinkToLibrary: Boolean,
    profileId: String
  },
  computed: {
    link () {
      if (this.isLinkToLibrary) {
        return formatProfileLibraryTagMainLink({
          profileId: this.profileId,
          tagId: this.tagId
        })
      } else {
        return formatTagMainLink({
          tagName: this.tagName
        })
      }
    },
    tagId () {
      return this.tagData.id
    },
    tagName () {
      return this.tagData.name
    },
    tagCount () {
      return this.tagData.count
    }
  }
}
</script>

<style lang="sass" scoped></style>
