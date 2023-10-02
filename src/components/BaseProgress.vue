<template>
  <div
    ref="progress"
    class="ui small progress base-progress"
    :class="{
      inverted: isDarkMode
    }"
  >
    <div class="bar progress-bar">
      <div class="progress" />
    </div>

    <div
      class="label main-bottom-small-section"
      v-text="activeTextConditional"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import {
  set as setProgress,
  setTotalCount as setProgressTotalCount,
  increment as incrementProgress,
  reset as resetProgress,
  setValue as setProgressValue
} from '@/helpers/actions/plugins/semantic/progress'
import {
  main as mainProgressOptions
} from '@/helpers/formatters/plugins/semantic/options/progress'
import {
  number as formatNumber
} from '@/helpers/formatters'

export default {
  name: 'BaseProgress',
  props: {
    status: {
      type: String,
      required: true
    },
    scope: {
      type: String,
      required: true
    }
  },
  emits: [
    'complete'
  ],
  data () {
    return {
      count: 0,
      totalCount: 0
    }
  },
  computed: {
    ...mapState(
      layoutStore,
      [
        'isDarkMode'
      ]
    ),
    progressOptions () {
      return mainProgressOptions(
        {
          onChange: this.handleChange,
          onSuccess: this.handleComplete
        }
      )
    },
    activeTextConditional () {
      if (this.count) {
        return this.activeText
      } else {
        return this.loadingText
      }
    },
    activeText () {
      return this.$t(
        `${this.status}.active`,
        {
          count: this.countFormatted,
          counter: this.counterText
        }
      )
    },
    countFormatted () {
      return formatNumber(
        this.count
      )
    },
    counterText () {
      return this.$tc(
        `counters.genitive.${this.scope}`,
        this.totalCount,
        {
          count: this.totalCountFormatted
        }
      )
    },
    totalCountFormatted () {
      return formatNumber(
        this.totalCount
      )
    },
    loadingText () {
      return this.$t(
        'loading'
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
    handleChange (
      _,
      [
        count
      ],
      totalCount
    ) {
      this.count = count
      this.totalCount = totalCount
    },
    handleComplete () {
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
