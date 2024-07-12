<template>
  <div class="main-settings-options-block">
    <MaximizeOption />

    <QuitOption />

    <TrayOption />
  </div>
</template>

<script>
import MaximizeOption from './WindowOptions/MaximizeOption.vue'
import QuitOption from './WindowOptions/QuitOption.vue'
import TrayOption from './WindowOptions/TrayOption.vue'

export default {
  name: 'WindowOptions',
  components: {
    MaximizeOption,
    QuitOption,
    TrayOption
  }
}
</script>

<style lang="sass" scoped></style>
