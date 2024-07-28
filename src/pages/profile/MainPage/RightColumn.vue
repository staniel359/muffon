<template>
  <div class="main-right-column">
    <PlayingSegment
      v-if="playing"
      :playing="playing"
      :profile-id="profileId"
    />

    <CompatibilitySegment
      v-if="isRenderCompatibility"
      :profile-id="profileId"
      :profile-nickname="profileNickname"
    />

    <LibrarySegment
      :profile-data="profileData"
    />

    <FavoritesSegment
      :profile-id="profileId"
    />

    <TabsSegment
      :profile-id="profileId"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import PlayingSegment from './RightColumn/PlayingSegment.vue'
import CompatibilitySegment from './RightColumn/CompatibilitySegment.vue'
import LibrarySegment from './RightColumn/LibrarySegment.vue'
import FavoritesSegment from './RightColumn/FavoritesSegment.vue'
import TabsSegment from './RightColumn/TabsSegment.vue'
import {
  isCurrentProfile
} from '@/helpers/utils'

export default {
  name: 'RightColumn',
  components: {
    PlayingSegment,
    CompatibilitySegment,
    LibrarySegment,
    FavoritesSegment,
    TabsSegment
  },
  props: {
    profileData: {
      type: Object,
      required: true
    },
    profileId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState(
      profileStore,
      {
        currentProfileId: 'id'
      }
    ),
    isSelf () {
      return isCurrentProfile(
        this.profileId
      )
    },
    profileNickname () {
      return this.profileData.nickname
    },
    playing () {
      return this.profileData.playing
    },
    isRenderCompatibility () {
      return (
        this.currentProfileId &&
          !this.isSelf
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
