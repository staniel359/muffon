<template>
  <BaseScopeSelect
    class="main-select"
    :scopes="scopes"
    :selected="searchScope"
    @select="handleSelect"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import searchStore from '@/stores/search'
import BaseScopeSelect from '@/components/selects/BaseScopeSelect.vue'
import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'
import searchScopes from '@/helpers/data/searchScopes'

export default {
  name: 'ScopeSelect',
  components: {
    BaseScopeSelect
  },
  computed: {
    ...mapState(
      searchStore,
      {
        searchScope: 'scope'
      }
    ),
    scopes () {
      return searchScopes
    }
  },
  methods: {
    handleSelect (
      value
    ) {
      updateGlobalStore(
        {
          'search.scope': value
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
