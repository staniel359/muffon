<template>
  <BaseProfileFavoritesTabContainer
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
        is-with-external-link-option
      />
    </template>
  </BaseProfileFavoritesTabContainer>
</template>

<script>
import BaseProfileFavoritesTabContainer
  from '@/components/containers/tabs/profile/favorites/BaseProfileFavoritesTabContainer.vue'
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
    BaseProfileFavoritesTabContainer,
    BaseVideosSimpleList
  },
  props: {
    profileId: {
      type: String,
      required: true
    },
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
