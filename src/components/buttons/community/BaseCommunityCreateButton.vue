<template>
  <BaseCreateButton
    model="community"
    @click="handleButtonClick"
  />

  <BaseCommunityCreateModal
    ref="modal"
  />
</template>

<script>
import BaseCreateButton from '@/components/buttons/BaseCreateButton.vue'
import BaseCommunityCreateModal
  from '@/components/modals/community/BaseCommunityCreateModal.vue'

export default {
  name: 'BaseCommunityCreateButton',
  components: {
    BaseCreateButton,
    BaseCommunityCreateModal
  },
  methods: {
    handleButtonClick () {
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

<style lang="sass" scoped></style>
