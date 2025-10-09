// Define the shape of the data required to create a LocaleEntity
type LocaleEntityData = {
    name: string; // Human-readable name of the locale (e.g., "English")
    code: string; // Language code (e.g., "en", "fr", "ar")
    dir: string;  // Text direction (e.g., "ltr" or "rtl")
    flag: string; // SVG markup for the flag (as a string)
};

// Class representing a single locale
class LocaleEntity {
    constructor(private data: LocaleEntityData) {
    }

    // Returns the human-readable name of the locale
    getName(): string {
        return this.data.name;
    }

    // Returns the locale code
    getCode(): string {
        return this.data.code;
    }

    // Returns the text direction
    getDir(): string {
        return this.data.dir;
    }

    /**
     * Returns the SVG flag with custom width and height.
     * It replaces any existing width/height attributes in the SVG with the provided values.
     */
    getSvgFlag(width: number, height: number): string {
        return this.data.flag
            .replace(/\swidth="[^"]*"/, ` width="${width}"`)
            .replace(/\sheight="[^"]*"/, ` height="${height}"`);
    }
}

// Class for managing a collection of locales
class Locales {
    private readonly locales: LocaleEntity[]; // Array of LocaleEntity instances
    private currentLocale: LocaleEntity;      // Currently active locale

    /**
     * Initializes the Locales manager.
     * - Converts LocaleEntityData array into LocaleEntity instances.
     * - Sets the initial current locale based on document language or falls back to the first locale.
     */
    constructor(private supportedLocales: LocaleEntityData[]) {
        this.locales = supportedLocales.map(locale => new LocaleEntity(locale));

        // Check if we're in a browser environment before accessing document
        const lang = typeof document !== 'undefined' ? document.documentElement.lang : '';
        const found = this.locales.find(locale => locale.getCode() === lang);

        this.currentLocale = found ?? this.locales[0];
    }

    // Returns all available locales
    get(): LocaleEntity[] {
        return this.locales;
    }

    // Returns the current active locale
    current(): LocaleEntity {
        return this.currentLocale;
    }

    /**
     * Sets the active locale to the one matching the provided language code.
     * - If the locale is found, it is set as the current locale.
     * - If not, it logs a warning and keeps the current locale unchanged.
     */
    setLocale(lang: string): Locales {
        const locale = this.locales.find(locale => locale.getCode() === lang);

        if (locale) {
            this.currentLocale = locale;
        } else {
            console.warn(`Locale "${lang}" not found. Keeping current locale.`);
        }

        return this;
    }

    // Checks whether a locale with the given language code exists
    has(lang: string): boolean {
        return this.locales.some(locale => locale.getCode() === lang);
    }

    // Returns the LocaleEntity matching the given language code, or undefined if not found
    getByCode(lang: string): LocaleEntity | undefined {
        return this.locales.find(locale => locale.getCode() === lang);
    }
}

export { Locales };
