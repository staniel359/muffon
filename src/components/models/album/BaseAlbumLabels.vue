<template>
  <div
    v-if="labels"
  >
    <div class="ui labels">
      <BaseLabel
        v-for="(label, index) in labels"
        :key="index"
        class="basic large circular"
        :text="label"
      />
    </div>
  </div>
</template>

<script>
import BaseLabel from '*/components/BaseLabel.vue'

export default {
  name: 'BaseAlbumLabels',
  components: {
    BaseLabel
  },
  props: {
    albumData: {
      type: Object,
      required: true
    }
  },
  computed: {
    labels () {
      return this.albumData.labels
    }
  }
}
</script>

<style lang="sass" scoped></style>
