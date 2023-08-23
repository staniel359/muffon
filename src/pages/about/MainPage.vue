<template>
  <BaseSegmentContainer
    class="main-segment-container"
    :is-change-transparency="false"
  >
    <div class="left-column">
      <BaseImage
        class="main-logo-image"
        :image="logo"
        is-plain
      />
    </div>

    <div class="right-column">
      <BaseHeader
        tag="h2"
        :text="name"
      />

      <div class="version-section">
        <strong
          v-text="version"
        />
      </div>

      <div class="copyright-license-section">
        <div>
          <small
            v-text="copyrightText"
          />
        </div>

        <div>
          <small
            v-text="licenseText"
          />
        </div>
      </div>

      <BaseDivider />

      <div>
        <div class="link-section">
          <strong
            class="main-link"
            @click="handleHomepageLinkClick"
            v-text="homepageText"
          />
        </div>

        <div class="link-section">
          <strong
            class="main-link"
            @click="handleDonateLinkClick"
            v-text="donateText"
          />
        </div>

        <div class="link-section">
          <strong
            class="main-link"
            @click="handleContactLinkClick"
            v-text="contactText"
          />
        </div>
      </div>
    </div>
  </BaseSegmentContainer>
</template>

<script>
import {
  shell
} from 'electron'
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseImage from '@/components/images/BaseImage.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import logo from '@/assets/images/logo_sm.png'
import {
  name,
  version,
  author,
  license,
  homepage
} from '@/../package.json'
import {
  donate as donateLink
} from '@/helpers/data/links'

export default {
  name: 'MainPage',
  components: {
    BaseSegmentContainer,
    BaseImage,
    BaseHeader,
    BaseDivider
  },
  computed: {
    logo () {
      return logo
    },
    name () {
      return name
    },
    version () {
      return version
    },
    copyrightText () {
      return `Copyright (c) 2020-2023 ${this.authorName}`
    },
    authorName () {
      return author.name
    },
    licenseText () {
      return this.$t(
        'about.license',
        {
          license
        }
      )
    },
    homepageText () {
      return this.$t(
        'about.homepage'
      )
    },
    donateText () {
      return this.$t(
        'donate.header'
      )
    },
    contactText () {
      return this.$t(
        'about.contact'
      )
    },
    contactLink () {
      return author.url
    }
  },
  methods: {
    handleHomepageLinkClick () {
      this.openLink(
        homepage
      )
    },
    handleDonateLinkClick () {
      this.openLink(
        donateLink
      )
    },
    handleContactLinkClick () {
      this.openLink(
        this.contactLink
      )
    },
    openLink (
      value
    ) {
      shell.openExternal(
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.main-segment-container
  @extend .d-flex, .h-100, .no-margin, .no-border-radius
  padding: 2em 3em

.left-column
  margin-right: 1.5em
  width: 80px

.right-column
  @extend .flex-full

.version-section
  margin-top: 0.5em

.copyright-license-section
  margin-top: 0.5em

.link-section
  @extend .d-inline-block
  margin-right: 1.25em
  margin-bottom: 0.25em
</style>
