<template>
  <BaseTagPageContainer
    :scope="scope"
    :limit="limit"
  >
    <template #default="pageSlotProps">
      <BasePaginatedPageContainer
        responseDataName="tagData"
        :slotPropsData="pageSlotProps"
        :scope="scope"
        :limit="limit"
        :responsePageLimit="responsePageLimit"
        :isWithViewChange="isWithViewChange"
        :viewIndex="viewIndex"
      >
        <template #default="slotProps">
          <slot
            :[scope]="slotProps[scope]"
            :profileId="pageSlotProps.profileId"
          ></slot>
        </template>
      </BasePaginatedPageContainer>
    </template>
  </BaseTagPageContainer>
</template>

<script>
import BaseTagPageContainer from './BaseTagPageContainer.vue'
import BasePaginatedPageContainer
  from '*/components/containers/pages/BasePaginatedPageContainer.vue'

export default {
  name: 'BaseTagPaginatedPageContainer',
  components: {
    BaseTagPageContainer,
    BasePaginatedPageContainer
  },
  props: {
    scope: String,
    limit: Number,
    responsePageLimit: Number,
    isWithViewChange: Boolean,
    viewIndex: Number
  }
}
</script>

<style lang="sass" scoped></style>
