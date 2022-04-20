<template>
  <BaseButton
    class="basic message-button"
    icon="envelope"
    :text="messageText"
    @click="handleClick"
  />

  <BaseProfileMessageModal
    ref="modal"
    :profile-data="profileData"
  />
</template>

<script>
import BaseButton from '*/components/buttons/BaseButton.vue'
import BaseProfileMessageModal
  from '*/components/modals/profile/BaseProfileMessageModal.vue'

export default {
  name: 'MessageSection',
  components: {
    BaseButton,
    BaseProfileMessageModal
  },
  props: {
    profileData: Object
  },
  computed: {
    messageText () {
      return this.$t(
        'message.send'
      )
    }
  },
  methods: {
    handleClick () {
      this.showModal()
    },
    showModal () {
      this.$refs
        .modal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped>
.message-button
  @extend .no-margin
  margin-top: 0.5em !important
</style>
