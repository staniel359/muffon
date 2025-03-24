<template>
  <BaseHeader
    v-if="nickname"
    tag="h4"
    class="link"
    :text="nickname"
  />
  <div
    v-else
    v-text="deletedProfileText"
  />
</template>

<script>
import BaseHeader from '@/components/headers/BaseHeader.vue'

export default {
  name: 'NicknameSection',
  components: {
    BaseHeader
  },
  props: {
    profileData: {
      type: Object,
      required: true
    }
  },
  computed: {
    nickname () {
      return this.profileData.nickname
    },
    deletedProfileText () {
      return this.$t(
        'deletedModel.profile'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
