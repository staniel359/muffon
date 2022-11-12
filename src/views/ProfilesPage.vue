<template>
  <BaseProfilesPaginatedPageContainer
    model="profile"
    :scope="scope"
    :limit="limit"
    :order="order"
    is-with-top-segment
    is-with-order-change
  >
    <template
      #default="slotProps"
    >
      <BaseProfilesSimpleList
        :profiles="slotProps[scope]"
        is-with-created
      />
    </template>
  </BaseProfilesPaginatedPageContainer>
</template>

<script>
import BaseProfilesPaginatedPageContainer
  from '@/components/containers/pages/profiles/BaseProfilesPaginatedPageContainer.vue'
import BaseProfilesSimpleList
  from '@/components/lists/profiles/BaseProfilesSimpleList.vue'
import orderChangeMixin from '@/mixins/orderChangeMixin'

export default {
  name: 'ProfilesPage',
  components: {
    BaseProfilesPaginatedPageContainer,
    BaseProfilesSimpleList
  },
  mixins: [
    orderChangeMixin
  ],
  data () {
    return {
      limit: 50,
      scope: 'profiles',
      order: 'createdDesc'
    }
  }
}
</script>

<style lang="sass" scoped></style>
