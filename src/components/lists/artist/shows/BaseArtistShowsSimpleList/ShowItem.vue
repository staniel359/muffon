<template>
  <div class="item main-simple-list-item middle-aligned">
    <div class="content middle-aligned no-margin">
      <div class="width-35">
        <strong
          v-text="title"
        />
      </div>

      <div class="width-65 main-right-section">
        <div class="middle-aligned">
          <BaseIcon
            class="grey place-icon main-icon"
            icon="place"
          />

          <div
            class="flex-full main-right-extrasmall-section"
            v-text="place"
          />
        </div>

        <div class="main-bottom-mini-section middle-aligned">
          <BaseIcon
            class="location-icon main-icon text-align-center"
            :icon="countryIcon"
            is-flag
          />

          <strong
            class="flex-full main-right-extrasmall-section"
            v-text="location"
          />
        </div>
      </div>
    </div>

    <BaseTimestampSection
      class="description right main-right-section"
      :created="date"
      is-only-date
    />
  </div>
</template>

<script>
import {
  getAlpha2Code as getCountryAlpha2Code
} from 'i18n-iso-countries'
import BaseTimestampSection
  from '@/components/sections/BaseTimestampSection.vue'
import BaseIcon from '@/components/icons/BaseIcon.vue'

export default {
  name: 'ShowItem',
  components: {
    BaseTimestampSection,
    BaseIcon
  },
  props: {
    showData: {
      type: Object,
      required: true
    }
  },
  computed: {
    title () {
      return this.showData.title
    },
    place () {
      return this.showData.place
    },
    countryIcon () {
      return this.countryCode.toLowerCase()
    },
    countryCode () {
      return getCountryAlpha2Code(
        this.country,
        'en'
      )
    },
    country () {
      return this.showData.country
    },
    location () {
      return this.showData.location
    },
    date () {
      return this.showData.date
    }
  }
}
</script>

<style lang="sass" scoped>
.main-simple-list-item
  padding: 1.5rem 1rem !important

.place-icon
  width: 25px

.location-icon
  width: 25px
</style>
