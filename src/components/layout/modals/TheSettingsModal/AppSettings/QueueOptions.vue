<template>
  <div class="main-settings-options-block">
    <BaseDivider
      :text="queueText"
      is-horizontal
    />

    <div>
      <AutoplayOption />
    </div>
  </div>
</template>

<script>
import BaseDivider from '*/components/BaseDivider.vue'
import AutoplayOption from './QueueOptions/AutoplayOption.vue'

export default {
  name: 'QueueOptions',
  components: {
    BaseDivider,
    AutoplayOption
  },
  computed: {
    queueText () {
      return this.$t(
        'settings.sections.app.queue'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
