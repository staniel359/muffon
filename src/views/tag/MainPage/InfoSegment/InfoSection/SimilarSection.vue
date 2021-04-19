<template>
  <div>
    <div
      v-if="isLoading"
      class="ui labels"
    >
      <div class="ui large label">
        <div class="ui active mini inline loader"></div>
      </div>
    </div>
    <template v-else-if="isAnyTags">
      <div class="ui labels">
        <div class="ui large basic label">
          {{ similarTextFormatted }}
        </div>
      </div>

      <BaseTagsList
        class="tag-similar-tags"
        :tags="similar"
      />
    </template>
  </div>
</template>

<script>
import BaseTagsList from '@/lists/tags/BaseTagsList.vue'
import fetchTagData from '#/actions/api/tag/fetchData'
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'SimilarSection',
  components: {
    BaseTagsList
  },
  props: {
    tagName: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      isLoading: false,
      error: null,
      tagData: null
    }
  },
  computed: {
    isAnyTags () {
      return this.similar?.length
    },
    similar () {
      return this.tagData?.similar
    },
    similarTextFormatted () {
      return localize(
        'pages.tag.segments.similar'
      )
    },
    tagDataArgs () {
      return {
        tagName: this.tagName,
        scope: 'similar'
      }
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchTagData,
    fetchData () {
      this.fetchTagData(this.tagDataArgs)
    }
  }
}
</script>

<style lang="sass" scoped>
.labels
  @extend .d-inline
</style>
