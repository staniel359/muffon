<template>
  <div class="header-block">
    <BaseHeaderContainer
      tag="h2"
    >
      {{ albumTitle }}

      <span
        v-if="albumExtraTitle"
        class="sub header main-extra-title"
      >
        <strong
          v-text="albumExtraTitle"
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
  from '@/components/containers/BaseHeaderContainer.vue'
import BaseArtistLinks from '@/components/links/BaseArtistLinks.vue'

export default {
  name: 'HeaderBlock',
  components: {
    BaseHeaderContainer,
    BaseArtistLinks
  },
  props: {
    albumData: {
      type: Object,
      required: true
    }
  },
  computed: {
    albumTitle () {
      return this.albumData.title
    },
    albumExtraTitle () {
      return this.albumData.extra_title
    },
    artists () {
      return this.albumData.artists
    }
  }
}
</script>

<style lang="sass" scoped>
.header-block
  @extend .flex-full
  margin-bottom: 0.75em

.album-artist-name
  @extend .text-medium-light
</style>
