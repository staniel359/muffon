<template>
  <BaseDropdown
    :options="scopeOptions"
    :selected="selected"
    :is-bordered="false"
    is-only-icon
    is-menu-left
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
  inject: [
    'setViewId'
  ],
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
  data () {
    return {
      options: [
        {
          id: 'simple',
          icon: 'listSimple'
        },
        {
          id: 'table',
          icon: 'listTable'
        },
        {
          id: 'extended',
          icon: 'listExtended'
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
        ],
        videos: [
          'simple',
          'table'
        ]
      }
    }
  },
  computed: {
    optionsData () {
      return Object.fromEntries(
        this.optionsFormatted
      )
    },
    optionsFormatted () {
      return this.options.map(
        this.formatOption
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
      this.setViewId(
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
