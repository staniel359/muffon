<template>
  <div
    :class="[
      'ui raised segments',
      'main-segment-container',
      'main-profile-page-left-column',
      'main-sticky-container'
    ]"
  >
    <InfoSegment
      :profile-data="profileData"
    />

    <ExtraInfoSegment
      :profile-data="profileData"
    />

    <FollowSegment
      :profile-data="profileData"
    />

    <FollowMessageSegment
      v-if="!isSelf"
      :profile-data="profileData"
    />
  </div>
</template>

<script>
import InfoSegment from './LeftColumn/InfoSegment.vue'
import ExtraInfoSegment from './LeftColumn/ExtraInfoSegment.vue'
import FollowSegment from './LeftColumn/FollowSegment.vue'
import FollowMessageSegment from './LeftColumn/FollowMessageSegment.vue'
import {
  isCurrentProfile
} from '*/helpers/utils'

export default {
  name: 'LeftColumn',
  components: {
    InfoSegment,
    ExtraInfoSegment,
    FollowSegment,
    FollowMessageSegment
  },
  props: {
    profileData: {
      type: Object,
      required: true
    }
  },
  computed: {
    isSelf () {
      return isCurrentProfile(
        this.profileId
      )
    },
    profileId () {
      return this.profileData.id
    }
  }
}
</script>

<style lang="sass" scoped></style>
