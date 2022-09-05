<template>
  <div class="content">
    <p
      class="text-section"
      v-text="nonProfitText"
    />

    <p
      class="text-section"
      v-text="fundsText"
    />

    <p
      class="text-section"
      v-text="timeEffortText"
    />

    <p
      class="text-section"
      v-text="helpText"
    />

    <p>
      <strong
        v-text="wouldText"
      />
    </p>
  </div>
</template>

<script>
export default {
  name: 'ContentSection',
  computed: {
    nonProfitText () {
      return this.$t(
        'donate.content.nonProfit'
      )
    },
    fundsText () {
      return this.$t(
        'donate.content.funds'
      )
    },
    timeEffortText () {
      return this.$t(
        'donate.content.timeEffort'
      )
    },
    helpText () {
      return this.$t(
        'donate.content.help'
      )
    },
    wouldText () {
      return this.$t(
        'donate.content.would'
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.text-section
  margin-bottom: 0.5em !important
</style>
