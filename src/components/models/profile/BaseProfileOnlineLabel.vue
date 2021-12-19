<template>
  <div
    class="ui tiny empty circular label main-profile-online-label"
    :class="labelColor"
  ></div>
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
    labelColor () {
      return this.isOnline ? 'green' : 'red'
    },
    isOnline () {
      return this.profileData.online
    }
  }
}
</script>

<style lang="sass" scoped></style>
