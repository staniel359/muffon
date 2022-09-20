<template>
  <BaseTagModalContainer
    ref="modal"
    :tag-name="tagName"
    :scope="scope"
  >
    <template #default="slotProps">
      <BaseDescription
        :description="slotProps[scope]"
        is-modal
      />
    </template>
  </BaseTagModalContainer>
</template>

<script>
import BaseTagModalContainer
  from '@/components/containers/modals/tag/BaseTagModalContainer.vue'
import BaseDescription from '@/components/BaseDescription.vue'

export default {
  name: 'BaseTagDescriptionModal',
  components: {
    BaseTagModalContainer,
    BaseDescription
  },
  props: {
    tagName: String
  },
  data () {
    return {
      scope: 'description'
    }
  },
  methods: {
    show () {
      this.$refs
        .modal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
