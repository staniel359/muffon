<template>
  <div class="tags-section">
    <div class="ui labels">
      <TagItem
        v-for="tagData in tags"
        :key="tagData.uuid"
        :tag-data="tagData"
      />
    </div>
  </div>
</template>

<script>
import TagItem from './TagsSection/TagItem.vue'

export default {
  name: 'TagsSection',
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
  }
}
</script>

<style lang="sass" scoped>
.tags-section
  margin-top: 1em
</style>
