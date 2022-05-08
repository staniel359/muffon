<template>
  <BaseLabelLinkContainer
    :link="link"
  >
    <span
      class="link"
      v-text="tagName"
    />

    <div
      v-if="tagCount"
      class="detail"
    >
      <BaseIcon
        icon="microphone"
      />

      {{ tagCount }}
    </div>
  </BaseLabelLinkContainer>
</template>

<script>
import BaseLabelLinkContainer
  from '*/components/containers/links/BaseLabelLinkContainer.vue'
import BaseIcon from '*/components/BaseIcon.vue'
import {
  main as formatTagMainLink
} from '*/helpers/formatters/links/tag'
import {
  main as formatProfileLibraryTagMainLink
} from '*/helpers/formatters/links/profile/library/tag'

export default {
  name: 'TagItem',
  components: {
    BaseLabelLinkContainer,
    BaseIcon
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
