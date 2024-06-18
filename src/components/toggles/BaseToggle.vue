<template>
  <div
    ref="checkbox"
    class="ui toggle checkbox base-toggle"
    :class="{
      inverted: isDarkMode
    }"
  >
    <input type="checkbox">
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import {
  check as checkCheckbox
} from '@/helpers/actions/plugins/semantic/checkbox'
import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'
import checkboxMixin from '@/mixins/checkboxMixin'

export default {
  name: 'BaseToggle',
  mixins: [
    checkboxMixin
  ],
  props: {
    isUpdateGlobalStore: {
      type: Boolean,
      default: true
    },
    storeKey: String
  },
  emits: [
    'isCheckedChange'
  ],
  computed: {
    ...mapState(
      layoutStore,
      [
        'isDarkMode'
      ]
    )
  },
  watch: {
    isChecked: {
      immediate: true,
      handler: 'handleIsChecked'
    }
  },
  methods: {
    async handleIsChecked (
      value
    ) {
      await this.$nextTick()

      checkCheckbox(
        this.$refs.checkbox,
        value
      )
    },
    change (
      value
    ) {
      if (this.isUpdateGlobalStore) {
        updateGlobalStore(
          {
            [this.storeKey]: value
          }
        )
      } else {
        this.$emit(
          'isCheckedChange',
          value
        )
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
