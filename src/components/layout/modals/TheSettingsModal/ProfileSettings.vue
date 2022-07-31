<template>
  <div>
    <InfoOptions />

    <PlayerOptions />
  </div>
</template>

<script>
import InfoOptions from './ProfileSettings/InfoOptions.vue'
import PlayerOptions from './ProfileSettings/PlayerOptions.vue'

export default {
  name: 'ProfileSettings',
  components: {
    InfoOptions,
    PlayerOptions
  }
}
</script>

<style lang="sass" scoped></style>
