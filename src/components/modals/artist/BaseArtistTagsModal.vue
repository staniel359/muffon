<template>
  <BaseArtistModalContainer
    ref="modal"
    :artist-name="artistName"
    :scope="scope"
  >
    <template #default="slotProps">
      <BaseModalTagsList
        :tags="slotProps[scope]"
        @tag-click="handleTagClick"
      />
    </template>
  </BaseArtistModalContainer>
</template>

<script>
import BaseArtistModalContainer
  from '@/components/containers/modals/artist/BaseArtistModalContainer.vue'
import BaseModalTagsList from '@/components/lists/tags/BaseModalTagsList.vue'

export default {
  name: 'BaseArtistTagsModal',
  components: {
    BaseArtistModalContainer,
    BaseModalTagsList
  },
  props: {
    artistName: String
  },
  data () {
    return {
      scope: 'tags'
    }
  },
  methods: {
    handleTagClick () {
      this.hide()
    },
    show () {
      this.$refs
        .modal
        .show()
    },
    hide () {
      this.$refs
        .modal
        .hide()
    }
  }
}
</script>

<style lang="sass" scoped></style>
