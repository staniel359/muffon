<template>
  <div class="ui large labels">
    <TagItem
      v-for="tagData in tagsCollection"
      :key="tagData.uuid"
      :tag-data="tagData"
      @click="handleTagClick"
    />
  </div>
</template>

<script>
import TagItem from './BaseModalTagsList/TagItem.vue'
import {
  collection as formatCollection
} from '*/helpers/formatters'

export default {
  name: 'BaseModalTagsList',
  components: {
    TagItem
  },
  props: {
    tags: {
      type: Array,
      default () {
        return []
      }
    }
  },
  emits: [
    'tagClick'
  ],
  computed: {
    tagsCollection () {
      return formatCollection(
        this.tags
      )
    }
  },
  methods: {
    handleTagClick () {
      this.$emit(
        'tagClick'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
