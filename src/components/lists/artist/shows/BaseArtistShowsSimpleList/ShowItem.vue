<template>
  <div class="item main-simple-list-item base-show-item">
    <div class="content">
      <div class="title-section">
        <strong
          v-text="title"
        />
      </div>

      <div class="place-location-section">
        <div class="place-section">
          <BaseIcon
            class="grey place-icon"
            icon="place"
          />

          <div
            class="place"
            v-text="place"
          />
        </div>

        <div class="location-section">
          <BaseIcon
            class="location-icon"
            :icon="countryIcon"
            is-flag
          />

          <strong
            class="location"
            v-text="location"
          />
        </div>
      </div>
    </div>

    <BaseTimestampSection
      class="description date-section"
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
.base-show-item
  padding: 1.5em 0.75em !important

.content
  @extend .d-flex, .align-items-center

.title-section
  flex: 0.425

.place-location-section
  flex: 0.575
[dir="ltr"]
  .place-location-section
    margin-left: 1.5em
[dir="rtl"]
  .place-location-section
    margin-right: 1.5em

.place-section
  @extend .d-flex, .align-items-center

.place-icon
  @extend .no-margin
  width: 25px

.place
  @extend .flex-full
[dir="ltr"]
  .place
    margin-left: 0.25em
[dir="rtl"]
  .place
    margin-right: 0.25em

.location-section
  @extend .d-flex, .align-items-center
  margin-top: 0.75em

.location-icon
  @extend .text-align-center
  width: 25px

.location
  @extend .flex-full
[dir="ltr"]
  .location
    margin-left: 0.25em
[dir="rtl"]
  .location
    margin-right: 0.25em

.date-section
  @extend .text-align-right
  flex: 0.3
[dir="ltr"]
  .date-section
    margin-left: 1.5em
[dir="rtl"]
  .date-section
    margin-right: 1.5em
</style>
