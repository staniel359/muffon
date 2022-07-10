<template>
  <div class="ui large labels">
    <BaseLabel
      v-if="isLoading"
      is-loading
    />
    <template
      v-else-if="similar?.length"
    >
      <BaseLabel
        :text="similarText"
      />

      <BaseTagsList
        :tags="similar"
      />
    </template>
  </div>
</template>

<script>
import BaseLabel from '*/components/BaseLabel.vue'
import BaseTagsList from '*/components/lists/tags/BaseTagsList.vue'
import getTag from '*/helpers/actions/api/tag/get'

export default {
  name: 'SimilarSection',
  components: {
    BaseLabel,
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
      tagData: null,
      scope: 'similar'
    }
  },
  computed: {
    similar () {
      return this.tagData?.similar
    },
    similarText () {
      return this.$t(
        'navigation.similar'
      ) + ':'
    },
    tagArgs () {
      return {
        tagName: this.tagName,
        scope: this.scope
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getTag,
    getData () {
      this.getTag(
        this.tagArgs
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
