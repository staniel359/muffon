<template>
  <BaseLabel
    icon="close"
    :text="name"
    is-reverse
    @icon-click="handleDeleteIconClick"
  />
</template>

<script>
import BaseLabel from '*/components/BaseLabel.vue'

export default {
  name: 'TagItem',
  components: {
    BaseLabel
  },
  props: {
    tagData: {
      type: Object,
      required: true
    }
  },
  emits: [
    'deleteIconClick'
  ],
  computed: {
    name () {
      return this.tagData.name
    },
    uuid () {
      return this.tagData.uuid
    }
  },
  methods: {
    handleDeleteIconClick () {
      this.$emit(
        'deleteIconClick',
        {
          uuid: this.uuid
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
