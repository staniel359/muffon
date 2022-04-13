<template>
  <div
    :class="[
      'ui tiny empty circular label',
      'main-profile-online-label',
      onlineLabelColor
    ]"
  />
</template>

<script>
export default {
  name: 'BaseProfileOnlineLabel',
  props: {
    profileData: {
      type: Object,
      required: true
    }
  },
  computed: {
    onlineLabelColor () {
      return this.isOnline ? 'green' : 'red'
    },
    isOnline () {
      return this.profileData.online
    }
  }
}
</script>

<style lang="sass" scoped></style>
