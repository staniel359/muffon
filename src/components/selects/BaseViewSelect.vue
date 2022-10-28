<template>
  <BaseDropdown
    class="floating"
    menu-direction="left"
    :options="scopeOptions"
    :selected="selected"
    :is-selection="false"
    is-only-icon
    @select="handleSelect"
  />
</template>

<script>
import BaseDropdown from '@/components/dropdowns/BaseDropdown.vue'

export default {
  name: 'BaseViewSelect',
  components: {
    BaseDropdown
  },
  props: {
    scope: {
      type: String,
      required: true
    },
    viewId: {
      type: String,
      required: true
    }
  },
  emits: [
    'select'
  ],
  data () {
    return {
      options: [
        {
          id: 'simple',
          icon: 'ul list'
        },
        {
          id: 'table',
          icon: 'th'
        },
        {
          id: 'extended',
          icon: 'th list'
        }
      ],
      viewsData: {
        artists: [
          'simple',
          'table',
          'extended'
        ],
        albums: [
          'simple',
          'table'
        ]
      }
    }
  },
  computed: {
    optionsData () {
      return Object.fromEntries(
        this.options.map(
          this.formatOption
        )
      )
    },
    scopeOptions () {
      return this.scopeViews.map(
        this.getViewOption
      )
    },
    scopeViews () {
      return this.viewsData[
        this.scope
      ]
    },
    selected () {
      return this.optionsData[
        this.viewId
      ].id
    }
  },
  methods: {
    handleSelect (
      value
    ) {
      this.$emit(
        'select',
        value
      )
    },
    formatOption (
      optionData
    ) {
      const {
        id
      } = optionData

      optionData.name =
        this.$t(
          `lists.${id}`
        )

      return [
        id,
        optionData
      ]
    },
    getViewOption (
      viewId
    ) {
      return this.optionsData[
        viewId
      ]
    }
  }
}
</script>

<style lang="sass" scoped></style>
