<template>
  <BaseListContainer
    v-if="profileInfo"
    class="selection"
  >
    <div
      class="item main-simple-list-item"
      @click="handleClick"
    >
      <BaseProfileImage :image="image" />

      <div class="content">
        <BaseHeader
          tag="h4"
          :text="nickname"
        />

        <div class="description">
          {{ email }}
        </div>
      </div>
    </div>
  </BaseListContainer>
</template>

<script>
import { mapState } from 'vuex'
import BaseListContainer from '@/containers/BaseListContainer.vue'
import BaseProfileImage from '@/models/profile/BaseProfileImage.vue'
import BaseHeader from '@/BaseHeader.vue'
import { setGlobalData } from '#/actions'

export default {
  name: 'FastLoginSection',
  components: {
    BaseListContainer,
    BaseProfileImage,
    BaseHeader
  },
  computed: {
    ...mapState('profile', {
      profileInfo: 'info'
    }),
    image () {
      return this.profileInfo.image_url
    },
    nickname () {
      return this.profileInfo.nickname
    },
    email () {
      return this.profileInfo.email
    }
  },
  methods: {
    handleClick () {
      setGlobalData({
        'profile.isLoggedIn': true,
        'profile.isRemember': true
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
