<template>
  <BaseAddButton
    model="community"
    @click="handleButtonClick"
  />

  <BaseCommunityCreateModal
    ref="modal"
  />
</template>

<script>
import BaseAddButton from '@/components/buttons/BaseAddButton.vue'
import BaseCommunityCreateModal
  from '@/components/modals/community/BaseCommunityCreateModal.vue'

export default {
  name: 'BaseCommunityCreateButton',
  components: {
    BaseAddButton,
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
