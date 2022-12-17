<template>
  <BaseLabel
    class="primary circular"
    :class="size"
    :text="tagName"
    :counter="tagCount"
    :link="link"
    :is-invertable="false"
    :is-with-artists-count="isWithArtistsCount"
  />
</template>

<script>
import BaseLabel from '@/components/labels/BaseLabel.vue'
import {
  main as formatTagMainLink
} from '@/helpers/formatters/links/tag'
import {
  main as formatProfileLibraryTagMainLink
} from '@/helpers/formatters/links/profile/library/tag'

export default {
  name: 'TagItem',
  components: {
    BaseLabel
  },
  props: {
    tagData: {
      type: Object,
      required: true
    },
    size: {
      type: String,
      default: 'large'
    },
    isLinkToLibrary: Boolean,
    profileId: String,
    isWithArtistsCount: Boolean
  },
  computed: {
    link () {
      if (this.isLinkToLibrary) {
        return formatProfileLibraryTagMainLink(
          {
            profileId: this.profileId,
            libraryTagId: this.libraryTagId
          }
        )
      } else {
        return formatTagMainLink(
          {
            tagName: this.tagName
          }
        )
      }
    },
    libraryTagId () {
      return this.tagData.library.id
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
