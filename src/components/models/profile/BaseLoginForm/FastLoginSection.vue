<template>
  <BaseListContainer
    v-if="profileInfo"
    class="selection"
  >
    <div
      class="item main-simple-list-item"
      @click="handleClick"
    >
      <BaseProfileAvatar :avatar="avatar" />

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
import BaseProfileAvatar from '@/models/profile/BaseProfileAvatar.vue'
import BaseHeader from '@/BaseHeader.vue'
import { setGlobalData } from '#/actions'

export default {
  name: 'FastLoginSection',
  components: {
    BaseListContainer,
    BaseProfileAvatar,
    BaseHeader
  },
  computed: {
    ...mapState('profile', {
      profileInfo: 'info'
    }),
    avatar () {
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
        'profile.isRemember': true
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
