<template>
  <div class="album-header">
    <BaseHeaderContainer tag="h2">
      {{ albumTitle }}

      <span
        v-if="albumExtraTitle"
        class="sub header main-extra-title"
      >
        <strong
          v-html="albumExtraTitle"
        />
      </span>
    </BaseHeaderContainer>

    <BaseHeaderContainer
      class="album-artist-name"
      tag="h3"
    >
      <BaseArtistLinks
        :artists="artists"
      />
    </BaseHeaderContainer>
  </div>
</template>

<script>
import BaseHeaderContainer
  from '*/components/containers/BaseHeaderContainer.vue'
import BaseArtistLinks from '*/components/links/BaseArtistLinks.vue'

export default {
  name: 'AlbumHeader',
  components: {
    BaseHeaderContainer,
    BaseArtistLinks
  },
  props: {
    albumTitle: {
      type: String,
      required: true
    },
    artists: Array,
    albumExtraTitle: String
  }
}
</script>

<style lang="sass" scoped>
.album-header
  margin-bottom: 0.75em

.album-artist-name
  @extend .text-medium-light
</style>
