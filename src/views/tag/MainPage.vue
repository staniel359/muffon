<template>
  <BaseTagPageContainer
    :tag-name="tagName"
  >
    <template
      #default="slotProps"
    >
      <InfoSegment
        :tag-data="slotProps.tagData"
      />

      <TabsSegment
        :tag-name="slotProps.tagName"
      />
    </template>
  </BaseTagPageContainer>
</template>

<script>
import BaseTagPageContainer
  from '@/components/containers/pages/tag/BaseTagPageContainer.vue'
import InfoSegment from './MainPage/InfoSegment.vue'
import TabsSegment from './MainPage/TabsSegment.vue'

export default {
  name: 'MainPage',
  components: {
    BaseTagPageContainer,
    InfoSegment,
    TabsSegment
  },
  props: {
    tagName: String
  }
}
</script>

<style lang="sass" scoped></style>
