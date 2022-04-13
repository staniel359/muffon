<template>
  <div
    ref="progress"
    class="ui small progress main-progress"
    :class="{
      inverted: isDarkMode
    }"
  >
    <div class="bar base">
      <div class="progress" />
    </div>

    <div
      class="label"
      v-text="status"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import {
  setProgress,
  setProgressTotalCount,
  incrementProgress,
  resetProgress,
  setProgressValue
} from '*/helpers/actions/plugins/semantic'
import {
  mainProgressOptions
} from '*/helpers/data/plugins/semantic'

export default {
  name: 'BaseProgress',
  props: {
    formatActive: {
      type: Function,
      required: true
    },
    status: String
  },
  emits: [
    'complete'
  ],
  computed: {
    ...mapState(
      'layout',
      [
        'isDarkMode'
      ]
    ),
    progressOptions () {
      return mainProgressOptions(
        {
          formatActive: this.formatActive,
          onSuccess: this.handleSuccess
        }
      )
    }
  },
  mounted () {
    setProgress(
      this.$refs.progress,
      this.progressOptions
    )
  },
  methods: {
    handleSuccess () {
      this.$emit(
        'complete'
      )
    },
    reset () {
      resetProgress(
        this.$refs.progress
      )
    },
    setTotalCount (
      value
    ) {
      setProgressTotalCount(
        this.$refs.progress,
        value
      )
    },
    increment () {
      incrementProgress(
        this.$refs.progress
      )
    },
    setValue (
      value
    ) {
      setProgressValue(
        this.$refs.progress,
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
