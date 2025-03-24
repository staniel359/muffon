<template>
  <BaseTagModalContainer
    ref="modal"
    :tag-name="tagName"
    :scope="scope"
  >
    <template
      #default="slotProps"
    >
      <BaseDescriptionSection
        :description="slotProps[scope]"
      />
    </template>
  </BaseTagModalContainer>
</template>

<script>
import BaseTagModalContainer
  from '@/components/containers/modals/tag/BaseTagModalContainer.vue'
import BaseDescriptionSection
  from '@/components/sections/BaseDescriptionSection.vue'

export default {
  name: 'BaseTagDescriptionModal',
  components: {
    BaseTagModalContainer,
    BaseDescriptionSection
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
