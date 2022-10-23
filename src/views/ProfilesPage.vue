<template>
  <BaseProfilesPageContainer
    ref="page"
    :limit="limit"
  >
    <template #default="pageSlotProps">
      <BasePaginatedPageContainer
        :response-data="pageSlotProps.profilesData"
        :is-loading="pageSlotProps.isLoading"
        :error="pageSlotProps.error"
        :scope="scope"
        :limit="limit"
      >
        <template #default="slotProps">
          <BaseProfilesSimpleList
            :profiles="slotProps[scope]"
            is-with-created
          />
        </template>
      </BasePaginatedPageContainer>
    </template>
  </BaseProfilesPageContainer>
</template>

<script>
import BaseProfilesPageContainer
  from '@/components/containers/pages/profiles/BaseProfilesPageContainer.vue'
import BasePaginatedPageContainer
  from '@/components/containers/pages/BasePaginatedPageContainer.vue'
import BaseProfilesSimpleList
  from '@/components/lists/profiles/BaseProfilesSimpleList.vue'
import paginatedPageMixin from '@/mixins/paginatedPageMixin'

export default {
  name: 'ProfilesPage',
  components: {
    BaseProfilesPageContainer,
    BasePaginatedPageContainer,
    BaseProfilesSimpleList
  },
  mixins: [
    paginatedPageMixin
  ],
  data () {
    return {
      limit: 50,
      scope: 'profiles'
    }
  }
}
</script>

<style lang="sass" scoped></style>
