<template>
  <BaseListContainer
    v-if="profileInfo"
    class="selection"
  >
    <div
      class="item main-simple-list-item"
      @click="handleClick"
    >
      <BaseImage
        class="circular bordered"
        :image="avatar_url"
      />

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
import BaseImage from '@/BaseImage.vue'
import BaseHeader from '@/BaseHeader.vue'
import { setGlobalData } from '#/actions'

export default {
  name: 'FastLoginSection',
  components: {
    BaseListContainer,
    BaseImage,
    BaseHeader
  },
  computed: {
    ...mapState('profile', {
      profileInfo: 'info'
    }),
    avatar_url () {
      return this.profileInfo.avatar_url
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
        'profile.remember': true
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
