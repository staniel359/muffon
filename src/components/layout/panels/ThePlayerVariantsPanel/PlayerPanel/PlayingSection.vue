<template>
  <div class="playing-section middle-aligned">
    <BaseListContainer
      class="width-100"
    >
      <PlayingBlock />
    </BaseListContainer>
  </div>
</template>

<script>
import BaseListContainer
  from '@/components/containers/lists/BaseListContainer.vue'
import PlayingBlock from './PlayingSection/PlayingBlock.vue'

export default {
  name: 'PlayingSection',
  components: {
    BaseListContainer,
    PlayingBlock
  }
}
</script>

<style lang="sass" scoped>
.playing-section
  width: 260px
</style>
