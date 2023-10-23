<template>
  <BaseLegalModalContainer
    ref="modal"
    :scope="scope"
  >
    <template
      #default="slotProps"
    >
      <div class="scrolling content">
        <div
          v-html="slotProps[scope]"
        />
      </div>
    </template>
  </BaseLegalModalContainer>
</template>

<script>
import BaseLegalModalContainer
  from '@/components/containers/modals/legal/BaseLegalModalContainer.vue'

export default {
  name: 'BaseLegalModal',
  components: {
    BaseLegalModalContainer
  },
  props: {
    scope: {
      type: String,
      required: true
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
