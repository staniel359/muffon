<template>
  <BaseLibraryOption
    action="show"
    :link="link"
    @click="handleClick"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BaseLibraryOption
  from '@/components/popups/options/BaseLibraryOption.vue'
import {
  main as formatProfileLibraryAlbumLink
} from '@/helpers/formatters/links/profile/library/album'

export default {
  name: 'LinkOption',
  components: {
    BaseLibraryOption
  },
  props: {
    libraryId: {
      type: Number,
      required: true
    }
  },
  emits: [
    'click'
  ],
  computed: {
    ...mapState(
      profileStore,
      {
        profileId: 'id'
      }
    ),
    link () {
      return formatProfileLibraryAlbumLink(
        {
          profileId: this.profileId,
          libraryAlbumId: this.libraryId
        }
      )
    }
  },
  methods: {
    handleClick () {
      this.$emit(
        'click'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
