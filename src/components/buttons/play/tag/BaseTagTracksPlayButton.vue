<template>
  <BasePlayButton
    :is-loading="isLoading"
    :error="error"
    :checked-options="checkedOptions"
    @click="handleClick"
  />
</template>

<script>
import getTag from '@/helpers/actions/api/tag/get'
import playableListMixin from '@/mixins/playableListMixin'

export default {
  name: 'BaseTagTracksPlayButton',
  mixins: [
    playableListMixin
  ],
  props: {
    tagName: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      tagData: null
    }
  },
  computed: {
    tagArgs () {
      return {
        tagName: this.tagName,
        scope: this.scope,
        limit: this.limitComputed
      }
    },
    tracksData () {
      return this.tagData
    }
  },
  methods: {
    getTag,
    getTracksData () {
      return this.getTag(
        this.tagArgs
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
