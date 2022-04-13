<template>
  <BaseProfilesPageContainer
    :limit="limit"
  >
    <template #default="pageSlotProps">
      <BasePaginatedPageContainer
        response-data-name="profilesData"
        :slot-props-data="pageSlotProps"
        :scope="scope"
        :limit="limit"
      >
        <template #default="slotProps">
          <BaseProfilesSimpleList
            :profiles="slotProps[scope]"
          />
        </template>
      </BasePaginatedPageContainer>
    </template>
  </BaseProfilesPageContainer>
</template>

<script>
import BaseProfilesPageContainer
  from '*/components/containers/pages/profiles/BaseProfilesPageContainer.vue'
import BasePaginatedPageContainer
  from '*/components/containers/pages/BasePaginatedPageContainer.vue'
import BaseProfilesSimpleList
  from '*/components/lists/profiles/BaseProfilesSimpleList.vue'

export default {
  name: 'ProfilesPage',
  components: {
    BaseProfilesPageContainer,
    BasePaginatedPageContainer,
    BaseProfilesSimpleList
  },
  data () {
    return {
      limit: 50,
      scope: 'profiles'
    }
  }
}
</script>

<style lang="sass" scoped></style>
