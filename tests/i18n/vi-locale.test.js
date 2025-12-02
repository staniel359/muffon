/**
 * Property-Based Tests and Unit Tests for Vietnamese Localization
 * Feature: vietnamese-localization
 */

import { describe, test, expect, beforeEach } from 'vitest'
import * as fc from 'fast-check'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { createI18n } from 'vue-i18n'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load locale files
const enLocale = JSON.parse(
  readFileSync(join(__dirname, '../../src/plugins/i18n/locales/en.json'), 'utf-8')
)
const viLocale = JSON.parse(
  readFileSync(join(__dirname, '../../src/plugins/i18n/locales/vi.json'), 'utf-8')
)
const backendViLocale = JSON.parse(
  readFileSync(join(__dirname, '../../electron/plugins/i18n/locales/vi.json'), 'utf-8')
)

/**
 * Helper function to get all nested keys from an object
 * Returns an array of dot-notation paths (e.g., ['navigation.home', 'navigation.artists'])
 */
function getAllKeys(obj, prefix = '') {
  const keys = []
  
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key
    
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      keys.push(...getAllKeys(obj[key], fullKey))
    } else {
      keys.push(fullKey)
    }
  }
  
  return keys
}

/**
 * Helper function to get value from nested object using dot notation
 */
function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => current?.[key], obj)
}

/**
 * Helper function to get all nested paths from an object including intermediate objects
 * Returns an array of objects with path and type information
 */
function getAllPaths(obj, prefix = '') {
  const paths = []
  
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key
    const value = obj[key]
    
    if (value === null) {
      paths.push({ path: fullKey, type: 'null' })
    } else if (Array.isArray(value)) {
      paths.push({ path: fullKey, type: 'array' })
    } else if (typeof value === 'object') {
      paths.push({ path: fullKey, type: 'object' })
      paths.push(...getAllPaths(value, fullKey))
    } else {
      paths.push({ path: fullKey, type: typeof value })
    }
  }
  
  return paths
}

describe('Vietnamese Localization - Unit Tests', () => {
  /**
   * Test that vi.json files are valid JSON
   * Requirements: 1.1, 3.1, 3.2
   */
  test('Frontend vi.json is valid JSON', () => {
    // If we got here, the file was successfully parsed
    expect(viLocale).toBeDefined()
    expect(typeof viLocale).toBe('object')
    expect(viLocale).not.toBeNull()
  })

  test('Backend vi.json is valid JSON', () => {
    // If we got here, the file was successfully parsed
    expect(backendViLocale).toBeDefined()
    expect(typeof backendViLocale).toBe('object')
    expect(backendViLocale).not.toBeNull()
  })

  /**
   * Test that frontend i18n loads Vietnamese locale successfully
   * Requirements: 1.1, 3.1
   */
  test('Frontend i18n loads Vietnamese locale successfully', () => {
    const i18n = createI18n({
      locale: 'vi',
      fallbackLocale: 'en',
      messages: {
        en: enLocale,
        vi: viLocale
      }
    })

    // Check that Vietnamese locale is available
    expect(i18n.global.availableLocales).toContain('vi')
    
    // Check that messages are loaded
    expect(i18n.global.messages.vi).toBeDefined()
    expect(Object.keys(i18n.global.messages.vi).length).toBeGreaterThan(0)
  })

  /**
   * Test locale switching to 'vi' returns Vietnamese strings
   * Requirements: 1.2
   */
  test('Locale switching to vi returns Vietnamese strings', () => {
    const i18n = createI18n({
      locale: 'en',
      fallbackLocale: 'en',
      messages: {
        en: enLocale,
        vi: viLocale
      }
    })

    // Initially in English
    expect(i18n.global.t('navigation.home')).toBe('Home page')

    // Switch to Vietnamese
    i18n.global.locale = 'vi'
    expect(i18n.global.t('navigation.home')).toBe('Trang chủ')
    
    // Test another key
    expect(i18n.global.t('navigation.artists')).toBe('Nghệ sĩ')
  })

  /**
   * Test fallback to English for missing keys
   * Requirements: 1.3
   */
  test('Fallback to English for missing keys', () => {
    // Create a Vietnamese locale with a missing key
    const incompleteViLocale = {
      navigation: {
        home: 'Trang chủ'
        // Missing 'artists' key
      }
    }

    const i18n = createI18n({
      locale: 'vi',
      fallbackLocale: 'en',
      messages: {
        en: {
          navigation: {
            home: 'Home',
            artists: 'Artists'
          }
        },
        vi: incompleteViLocale
      }
    })

    // Existing key returns Vietnamese
    expect(i18n.global.t('navigation.home')).toBe('Trang chủ')
    
    // Missing key falls back to English
    expect(i18n.global.t('navigation.artists')).toBe('Artists')
  })

  /**
   * Test interpolation works with Vietnamese strings
   * Requirements: 2.2
   */
  test('Interpolation works with Vietnamese strings', () => {
    // Create test locales with interpolation
    const testEnLocale = {
      greeting: 'Hello {name}',
      count: '{count} items'
    }

    const testViLocale = {
      greeting: 'Xin chào {name}',
      count: '{count} mục'
    }

    const i18n = createI18n({
      locale: 'vi',
      fallbackLocale: 'en',
      messages: {
        en: testEnLocale,
        vi: testViLocale
      }
    })

    // Test interpolation with Vietnamese
    expect(i18n.global.t('greeting', { name: 'Minh' })).toBe('Xin chào Minh')
    expect(i18n.global.t('count', { count: 5 })).toBe('5 mục')
  })

  /**
   * Test that Vietnamese locale contains expected top-level keys
   * Requirements: 1.1, 4.1
   */
  test('Vietnamese locale contains expected structure', () => {
    // Check for major top-level keys that should exist
    const expectedKeys = ['navigation', 'errors', 'actions', 'links', 'inputs', 'modals']
    
    expectedKeys.forEach(key => {
      expect(viLocale).toHaveProperty(key)
      expect(typeof viLocale[key]).toBe('object')
    })
  })

  /**
   * Test that backend Vietnamese locale has expected structure
   * Requirements: 2.1, 3.2
   * 
   * Note: Backend locale has a different, smaller structure than frontend
   * as it only contains Electron app-specific strings
   */
  test('Backend Vietnamese locale has expected structure', () => {
    // Backend should have the expected keys for Electron app
    const expectedBackendKeys = ['show', 'hide', 'about', 'quit', 'update']
    
    expectedBackendKeys.forEach(key => {
      expect(backendViLocale).toHaveProperty(key)
    })
    
    // Backend locale should be a valid object
    expect(typeof backendViLocale).toBe('object')
    expect(Object.keys(backendViLocale).length).toBeGreaterThan(0)
  })
})

describe('Vietnamese Localization - Property Tests', () => {
  /**
   * Feature: vietnamese-localization, Property 2: Interpolation variables are preserved
   * Validates: Requirements 2.2
   * 
   * For any translation key containing interpolation variables in en.json,
   * all interpolation variables should also exist in the Vietnamese translation.
   */
  test('Property 2: Interpolation variables are preserved', () => {
    const allEnglishKeys = getAllKeys(enLocale)
    
    // Filter keys that contain interpolation variables
    const keysWithVariables = allEnglishKeys.filter(key => {
      const enValue = getNestedValue(enLocale, key)
      if (typeof enValue !== 'string') return false
      return /\{[^}]+\}/g.test(enValue)
    })
    
    // Create a property-based test that checks keys with interpolation variables
    const keyArbitrary = fc.constantFrom(...keysWithVariables)
    
    fc.assert(
      fc.property(keyArbitrary, (key) => {
        const enValue = getNestedValue(enLocale, key)
        const viValue = getNestedValue(viLocale, key)
        
        // Extract interpolation variables from English string
        const enVariables = enValue.match(/\{[^}]+\}/g) || []
        
        // Extract interpolation variables from Vietnamese string
        const viVariables = viValue.match(/\{[^}]+\}/g) || []
        
        // Sort both arrays for comparison
        const sortedEnVariables = [...enVariables].sort()
        const sortedViVariables = [...viVariables].sort()
        
        // The Vietnamese translation must contain the same variables
        expect(sortedViVariables).toEqual(sortedEnVariables)
        
        return true
      }),
      { numRuns: 100 } // Run minimum 100 iterations as specified
    )
  })

  /**
   * Feature: vietnamese-localization, Property 3: JSON structure matches English locale
   * Validates: Requirements 2.4
   * 
   * For any nested key path in en.json, the same key path should exist in vi.json
   * with the same structure (object vs string vs array).
   */
  test('Property 3: JSON structure matches English locale', () => {
    const allEnglishPaths = getAllPaths(enLocale)
    
    // Create a property-based test that checks all nested paths
    const pathArbitrary = fc.constantFrom(...allEnglishPaths)
    
    fc.assert(
      fc.property(pathArbitrary, (pathInfo) => {
        const { path, type } = pathInfo
        const viValue = getNestedValue(viLocale, path)
        
        // The path must exist in Vietnamese locale
        expect(viValue).toBeDefined()
        
        // Determine the type of the Vietnamese value
        let viType
        if (viValue === null) {
          viType = 'null'
        } else if (Array.isArray(viValue)) {
          viType = 'array'
        } else if (typeof viValue === 'object') {
          viType = 'object'
        } else {
          viType = typeof viValue
        }
        
        // The type must match the English locale
        expect(viType).toBe(type)
        
        return true
      }),
      { numRuns: 100 } // Run minimum 100 iterations as specified
    )
  })

  /**
   * Feature: vietnamese-localization, Property 4: All English keys have Vietnamese translations
   * Validates: Requirements 4.1
   * 
   * For any translation key in en.json, there should be a corresponding key in vi.json.
   */
  test('Property 4: All English keys have Vietnamese translations', () => {
    const allEnglishKeys = getAllKeys(enLocale)
    
    // Create a property-based test that checks all English keys
    const keyArbitrary = fc.constantFrom(...allEnglishKeys)
    
    fc.assert(
      fc.property(keyArbitrary, (key) => {
        const viValue = getNestedValue(viLocale, key)
        
        // The key must exist in Vietnamese locale
        expect(viValue).toBeDefined()
        
        // The value should not be null or undefined
        expect(viValue).not.toBeNull()
        expect(viValue).not.toBeUndefined()
        
        // The value should be a non-empty string
        if (typeof viValue === 'string') {
          expect(viValue.trim()).not.toBe('')
        }
        
        return true
      }),
      { numRuns: 100 } // Run minimum 100 iterations as specified
    )
  })
})
