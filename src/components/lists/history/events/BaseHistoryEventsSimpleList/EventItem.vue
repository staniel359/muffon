<template>
  <div
    class="item main-simple-list-item base-event-item"
  >
    <BaseIcon
      class="grey"
      :icon="modelIcon"
    />

    <div class="content">
      <TextSection
        :event-type="eventType"
        :model-type="modelType"
        :event-data="eventData"
      />
    </div>

    <BaseIcon
      class="event-type-icon"
      :icon="eventTypeIcon"
    />

    <BaseCreatedSection
      class="description right"
      :model-data="eventData"
    />
  </div>
</template>

<script>
import TextSection from './EventItem/TextSection.vue'
import BaseIcon from '@/components/icons/BaseIcon.vue'
import BaseCreatedSection from '@/components/sections/BaseCreatedSection.vue'
import {
  camelCase
} from 'camel-case'

export default {
  name: 'EventItem',
  components: {
    TextSection,
    BaseIcon,
    BaseCreatedSection
  },
  props: {
    eventData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      modelIcons: {
        bookmarkAlbum: 'bookmark',
        bookmarkArtist: 'bookmark',
        bookmarkTrack: 'bookmark',
        bookmarkVideo: 'bookmark',
        bookmarkVideoPlaylist: 'bookmark',
        community: 'community',
        conversation: 'conversation',
        favoriteAlbum: 'favorite',
        favoriteArtist: 'favorite',
        favoriteTrack: 'favorite',
        favoriteVideo: 'favorite',
        libraryAlbum: 'library',
        libraryArtist: 'library',
        libraryTrack: 'library',
        listenedAlbum: 'listened',
        listenedArtist: 'listened',
        listenedTrack: 'listened',
        membership: 'member',
        playlist: 'playlist',
        playlistTrack: 'playlist',
        post: 'post',
        postComment: 'comment',
        profile: 'profile',
        recommendationArtist: 'recommendation',
        recommendationTrack: 'recommendation',
        relationship: 'follower',
        watchedVideo: 'watched'
      }
    }
  },
  computed: {
    modelIcon () {
      return this.modelIcons[
        this.modelType
      ]
    },
    modelType () {
      return camelCase(
        this.eventData.model.type
      )
    },
    eventType () {
      return this.eventData.type
    },
    eventTypeIcon () {
      return camelCase(
        `event_${this.eventType}`
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.base-event-item
  padding: 0.5em 0.75em !important

.content
  margin-left: 0.75em

.event-type-icon
  @extend .no-padding
  margin-left: 0.75em !important
  min-width: unset !important
</style>
