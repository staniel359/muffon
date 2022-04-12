<template>
  <BaseVideoModalContainer
    ref="modal"
    :videoId="videoId"
    :scope="scope"
  >
    <template #default="slotProps">
      <BaseDescription
        :description="slotProps[scope]"
        isModal
      />
    </template>
  </BaseVideoModalContainer>
</template>

<script>
import BaseVideoModalContainer
  from '*/components/containers/modals/video/BaseVideoModalContainer.vue'
import BaseDescription from '*/components/BaseDescription.vue'

export default {
  name: 'BaseVideoDescriptionModal',
  components: {
    BaseVideoModalContainer,
    BaseDescription
  },
  props: {
    videoId: String
  },
  data () {
    return {
      scope: 'description'
    }
  },
  methods: {
    show () {
      this.$refs.modal.show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
