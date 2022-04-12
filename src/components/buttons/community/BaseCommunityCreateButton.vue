<template>
  <BaseButton
    class="basic create-button"
    icon="plus"
    :text="createText"
    @click="handleButtonClick"
  />

  <BaseCommunityCreateModal
    ref="modal"
  />
</template>

<script>
import BaseButton from '*/components/buttons/BaseButton.vue'
import BaseCommunityCreateModal
  from '*/components/modals/community/BaseCommunityCreateModal.vue'

export default {
  name: 'BaseCommunityCreateButton',
  components: {
    BaseButton,
    BaseCommunityCreateModal
  },
  computed: {
    createText () {
      return this.$t(
        'actions.add.community'
      )
    }
  },
  methods: {
    handleButtonClick () {
      this.$refs.modal.show()
    }
  }
}
</script>

<style lang="sass" scoped>
.create-button
  @extend .no-margin
</style>
