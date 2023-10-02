<template>
  <div class="main-right-section">
    <BaseScopeSelect
      :scopes="scopes"
      :selected="scope"
      :is-bordered="false"
      is-menu-left
      @select="handleSelect"
    />
  </div>
</template>

<script>
import BaseScopeSelect from '@/components/selects/BaseScopeSelect.vue'

export default {
  name: 'ScopeSelect',
  components: {
    BaseScopeSelect
  },
  props: {
    scope: {
      type: String,
      required: true
    }
  },
  emits: [
    'select'
  ],
  data () {
    return {
      scopes: [
        {
          id: 'artists',
          icon: 'artist'
        },
        {
          id: 'albums',
          icon: 'album'
        },
        {
          id: 'tracks',
          icon: 'track'
        }
      ]
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
    }
  }
}
</script>

<style lang="sass" scoped></style>
