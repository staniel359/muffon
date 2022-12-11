<template>
  <div
    class="ui mini empty circular label main-profile-online-label"
    :class="onlineLabelColor"
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
      if (this.isOnline) {
        return 'green'
      } else {
        return null
      }
    },
    isOnline () {
      return this.profileData.online
    }
  }
}
</script>

<style lang="sass" scoped></style>
