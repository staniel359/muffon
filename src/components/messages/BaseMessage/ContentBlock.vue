<template>
  <p class="content-block">
    <BaseLink
      v-if="isContentLink"
      :link="link"
      :text="content"
      @click="handleLinkClick"
    />
    <template
      v-else
    >
      {{ content }}
    </template>
  </p>
</template>

<script>
import BaseLink from '@/components/links/BaseLink.vue'

export default {
  name: 'ContentBlock',
  components: {
    BaseLink
  },
  props: {
    content: {
      type: String,
      required: true
    },
    isContentLink: Boolean,
    link: Object
  },
  emits: [
    'linkClick'
  ],
  methods: {
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.content-block
  &:not(:first-child)
    margin-top: 0.2rem !important
</style>
