<template>
  <div class="ui icon message main-message">
    <i class="icon question" />
    <div class="content">
      <div class="header">
        {{ header }}
      </div>
      <p>
        {{ subheader }}
      </p>
    </div>
  </div>
</template>

<script>
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'NoCollectionMessage',
  props: {
    scope: {
      type: String,
      required: true
    }
  },
  computed: {
    header () {
      return localize(
        'paginated.noCollection.header',
        { collection: this.scope }
      )
    },
    subheader () {
      return localize(
        'paginated.noCollection.subheader',
        { collection: this.scope }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
