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
} from 'vuex'
import BaseLibraryOption from '../../options/BaseLibraryOption.vue'
import {
  main as formatProfileLibraryArtistMainLink
} from '*/helpers/formatters/links/profile/library/artist'

export default {
  name: 'ArtistLink',
  components: {
    BaseLibraryOption
  },
  props: {
    modelId: {
      type: String,
      required: true
    }
  },
  emits: [
    'click'
  ],
  computed: {
    ...mapState(
      'profile',
      {
        profileInfo: 'info'
      }
    ),
    link () {
      return formatProfileLibraryArtistMainLink(
        {
          profileId: this.profileId,
          artistId: this.modelId
        }
      )
    },
    profileId () {
      return this.profileInfo.id.toString()
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
