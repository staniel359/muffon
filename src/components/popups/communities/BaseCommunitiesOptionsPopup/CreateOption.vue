<template>
  <BaseOption
    icon="create"
    :text="createText"
    @click="handleClick"
  />

  <BaseCommunityCreateModal
    ref="modal"
  />
</template>

<script>
import BaseOption from '@/components/popups/options/BaseOption.vue'
import BaseCommunityCreateModal
  from '@/components/modals/community/BaseCommunityCreateModal.vue'

export default {
  name: 'CreateOption',
  components: {
    BaseOption,
    BaseCommunityCreateModal
  },
  inject: [
    'hidePopup'
  ],
  computed: {
    createText () {
      return this.$t(
        'actions.create'
      )
    }
  },
  methods: {
    handleClick () {
      this.hidePopup()

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
