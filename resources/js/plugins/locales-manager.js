// Define the shape of the data required to create a LocaleEntity
import { router } from '@inertiajs/vue3';
import { route } from 'ziggy-js';
import { loadLanguageAsync } from 'laravel-vue-i18n';
import Validator from 'validatorjs';

// Class representing a single locale
class LocaleEntity {
    constructor(data) {
        this.data = data;
    }

    // Returns the human-readable name of the locale
    getName() {
        return this.data.name;
    }

    // Returns the locale code
    getCode() {
        return this.data.code;
    }

    // Returns the text direction
    getDir() {
        return this.data.dir;
    }

    /**
     * Returns the SVG flag with custom width and height.
     * It replaces any existing width/height attributes in the SVG with the provided values.
     */
    getSvgFlag(width, height) {
        return this.data.flag
            .replace(/\swidth="[^"]*"/, ` width="${width}"`)
            .replace(/\sheight="[^"]*"/, ` height="${height}"`);
    }
}

// Class for managing a collection of locales
class Locales {
    /**
     * Initializes the Locales manager.
     * - Converts LocaleEntityData array into LocaleEntity instances.
     * - Sets the initial current locale based on document language or falls back to the first locale.
     */
    constructor(supportedLocales) {
        this.supportedLocales = supportedLocales;
        this.locales = supportedLocales.map(locale => new LocaleEntity(locale));

        // Check if we're in a browser environment before accessing document
        const lang = typeof document !== 'undefined' ? document.documentElement.lang : '';
        const found = this.locales.find(locale => locale.getCode() === lang);

        this.currentLocale = found || this.locales[0];
    }

    // Returns all available locales
    get() {
        return this.locales;
    }

    // Returns the current active locale
    current() {
        return this.currentLocale;
    }

    /**
     * Sets the active locale to the one matching the provided language code.
     * - If the locale is found, it is set as the current locale.
     * - If not, it logs a warning and keeps the current locale unchanged.
     */
    setLocale(lang) {
        const locale = this.locales.find(locale => locale.getCode() === lang);

        if (locale) {
            this.currentLocale = locale;

            router.get(route('locale.change', locale.getCode()));

            loadLanguageAsync(locale.getCode());

            Validator.useLang(locale.getCode());

            if (typeof document !== 'undefined') {
                document.documentElement.lang = locale.getCode();
                document.documentElement.dir = locale.getDir();
            }
        } else {
            console.warn(`Locale "${lang}" not found. Keeping current locale.`);
        }

        return this;
    }

    // Checks whether a locale with the given language code exists
    has(lang) {
        return this.locales.some(locale => locale.getCode() === lang);
    }

    // Returns the LocaleEntity matching the given language code, or undefined if not found
    getByCode(lang) {
        return this.locales.find(locale => locale.getCode() === lang);
    }
}

export { Locales };
