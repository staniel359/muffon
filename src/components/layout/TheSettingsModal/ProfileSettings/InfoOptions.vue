<template>
  <div class="main-settings-options-block">
    <BaseDivider
      :text="headerFormatted"
      isHorizontal
    />

    <EditForm />
  </div>
</template>

<script>
import BaseDivider from '@/BaseDivider.vue'
import EditForm from '@/layout/TheAuthentication/EditForm.vue'
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'InfoOptions',
  components: {
    BaseDivider,
    EditForm
  },
  computed: {
    headerFormatted () {
      return localize(
        'layout.settings.headers.profile.info'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
