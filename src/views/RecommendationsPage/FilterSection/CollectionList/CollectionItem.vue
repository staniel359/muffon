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
  name: 'CollectionItem',
  components: {
    BaseLabel
  },
  inject: [
    'deleteCollectionItem'
  ],
  props: {
    collectionItemData: {
      type: Object,
      required: true
    }
  },
  computed: {
    name () {
      return this.collectionItemData.name
    },
    uuid () {
      return this.collectionItemData.uuid
    }
  },
  methods: {
    handleDeleteIconClick () {
      this.deleteCollectionItem(
        {
          collection: 'collection',
          uuid: this.uuid
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
