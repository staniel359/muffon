<template>
  <BaseSidebarItem
    class="top-item"
    image-model="profile"
    :link="profileLink"
    :image="imageData?.extrasmall"
    :text="nickname"
    is-text-strong
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BaseSidebarItem from '@/components/BaseSidebarItem.vue'
import {
  main as formatProfileLink
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
    profileLink () {
      return formatProfileLink(
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
