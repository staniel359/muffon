<template>
  <div class="main-right-section">
    <BaseScopeSelect
      :scopes="scopes"
      :selected="selected"
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
  inject: [
    'setScope'
  ],
  props: {
    selected: {
      type: String,
      required: true
    }
  },
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
        }
      ]
    }
  },
  methods: {
    handleSelect (
      value
    ) {
      this.setScope(
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
