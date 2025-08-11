<template>
  <p class="main-text-container main-list-bottom-extrasmall-section">
    <BaseLink
      v-if="isContentLink"
      :link="link"
      :text="content"
      @click="handleLinkClick"
    />
    <template
      v-else
    >
      <div
        v-html="contentSanitized"
      />
    </template>
  </p>
</template>

<script>
import BaseLink from '@/components/links/BaseLink.vue'
import {
  sanitizeString
} from '@/helpers/utils'

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
  computed: {
    contentSanitized () {
      return sanitizeString(
        this.content
      )
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
