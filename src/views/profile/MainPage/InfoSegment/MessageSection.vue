<template>
  <BaseButton
    class="primary message-button"
    icon="envelope"
    :text="messageText"
    @click="handleClick"
  />

  <BaseProfileMessageModal
    ref="modal"
    :profileData="profileData"
  />
</template>

<script>
import BaseButton from '@/buttons/BaseButton.vue'
import BaseProfileMessageModal
  from '@/modals/profile/BaseProfileMessageModal.vue'

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
        'shared.profile.message'
      )
    }
  },
  methods: {
    handleClick () {
      this.$refs.modal.show()
    }
  }
}
</script>

<style lang="sass" scoped>
.message-button
  @extend .no-margin
  margin-top: 0.5em !important
</style>
