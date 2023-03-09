<template>
  <BaseProfileFavoriteTabContainer
    :profile-id="profileId"
    :scope="scope"
    :limit="limit"
    :is-active="isActive"
    @focus="handleFocus"
  >
    <template
      #default="slotProps"
    >
      <BaseVideosSimpleList
        :videos="slotProps[scope]"
        :profile-id="profileId"
        :is-with-favorite-option="!isSelf"
        :is-with-delete-option="isSelf"
        is-with-channel-title
        is-with-created
        is-favorite
        is-with-watched-option
        is-with-share-option
      />
    </template>
  </BaseProfileFavoriteTabContainer>
</template>

<script>
import BaseProfileFavoriteTabContainer
  from '@/components/containers/tabs/profile/favorites/BaseProfileFavoriteTabContainer.vue'
import BaseVideosSimpleList
  from '@/components/lists/videos/BaseVideosSimpleList.vue'
import {
  isCurrentProfile
} from '@/helpers/utils'
import {
  videos as videosLimits
} from '@/helpers/data/limits'

export default {
  name: 'VideosTab',
  components: {
    BaseProfileFavoriteTabContainer,
    BaseVideosSimpleList
  },
  props: {
    profileId: String,
    isActive: Boolean
  },
  emits: [
    'focus'
  ],
  data () {
    return {
      limit:
        videosLimits.simple.extrasmall,
      scope: 'videos'
    }
  },
  computed: {
    isSelf () {
      return isCurrentProfile(
        this.profileId
      )
    }
  },
  methods: {
    handleFocus () {
      this.$emit(
        'focus'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
