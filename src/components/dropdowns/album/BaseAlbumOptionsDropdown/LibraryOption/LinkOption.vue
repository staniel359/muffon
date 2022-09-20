<template>
  <BaseLibraryOption
    action="show"
    :link="link"
    @click="handleClick"
  />
</template>

<script>
import {
  mapGetters
} from 'vuex'
import BaseLibraryOption
  from '@/components/dropdowns/options/library/BaseLibraryOption.vue'
import {
  main as formatProfileLibraryAlbumMainLink
} from '@/helpers/formatters/links/profile/library/album'

export default {
  name: 'LinkOption',
  components: {
    BaseLibraryOption
  },
  props: {
    libraryId: {
      type: String,
      required: true
    }
  },
  emits: [
    'click'
  ],
  computed: {
    ...mapGetters(
      'profile',
      {
        profileId: 'id'
      }
    ),
    link () {
      return formatProfileLibraryAlbumMainLink(
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
