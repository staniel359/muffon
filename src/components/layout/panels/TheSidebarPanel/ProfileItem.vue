<template>
  <BaseSidebarItem
    class="top-item"
    image-model="profile"
    :link-data="linkData"
    :image="imageData?.extrasmall"
    :text="nickname"
    is-text-strong
    is-path-strict
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BaseSidebarItem from '@/components/BaseSidebarItem.vue'
import {
  main as formatProfileLinkData
} from '@/helpers/formatters/links/profile'

export default {
  name: 'ProfileItem',
  components: {
    BaseSidebarItem
  },
  computed: {
    ...mapState(
      profileStore,
      {
        profileId: 'id',
        profileInfo: 'info'
      }
    ),
    linkData () {
      return formatProfileLinkData(
        {
          profileId: this.profileId
        }
      )
    },
    imageData () {
      return this.profileInfo.image
    },
    nickname () {
      return this.profileInfo.nickname
    }
  }
}
</script>

<style lang="sass" scoped></style>
