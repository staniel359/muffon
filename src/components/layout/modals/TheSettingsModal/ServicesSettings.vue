<template>
  <BaseTabsContainer
    class="settings-group-tabs-container"
    :tabs="tabs"
    :is-pointing="false"
    is-vertical
  >
    <template
      v-for="(tabData, index) in tabs"
      :key="index"
      #[index]="slotProps"
    >
      <Component
        :is="tabData.component"
        class="settings-group-tab"
        :class="slotProps.class"
      />
    </template>
  </BaseTabsContainer>
</template>

<script>
import BaseTabsContainer
  from '@/components/containers/tabs/BaseTabsContainer.vue'
import LastfmOptions from './ServicesSettings/LastfmOptions.vue'

export default {
  name: 'ServicesSettings',
  components: {
    BaseTabsContainer,
    LastfmOptions
  },
  data () {
    return {
      tabs: [
        {
          name: 'Last.FM',
          scope: 'info',
          component: 'LastfmOptions'
        }
      ]
    }
  }
}
</script>

<style lang="sass" scoped></style>
