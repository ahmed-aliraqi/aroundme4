import countriesData from "@/data/countries";

type CountryEntityData = {
    name_en: string; // ensure your countriesData has `name_en`, `name_ar`, etc.
    name_ar?: string; // optional for other languages
    code: string;
    flag: string;
    dial_code: string;
    phone_placeholder: string;
    max_digits: number;
    prefix: string;
};

export class CountryEntity {
    constructor(private data: CountryEntityData) {}

    getName(lang: string = 'en'): string {
        // TypeScript needs a type assertion since data might not have dynamic keys
        return this.data['name_' + lang as keyof CountryEntityData] as string;
    }

    getCode(): string {
        return this.data.code;
    }

    getFlag(): string {
        return this.data.flag;
    }

    getDialCode(): string {
        return this.data.dial_code;
    }

    getPhonePlaceholder(): string {
        return this.data.phone_placeholder;
    }

    getMaxDigits(): number {
        return this.data.max_digits;
    }

    getPrefix(): string {
        return this.data.prefix;
    }
}

class Countries {
    private countries: CountryEntity[];

    constructor() {
        this.countries = countriesData.map(country => new CountryEntity(country));
    }

    from(countries: string[]): this {
        this.countries = this.get(countries);
        return this;
    }

    get(countries: string[] = []): CountryEntity[] {
        if (countries.length) {
            return this.countries.filter(country => countries.includes(country.getCode()));
        }
        return this.countries;
    }

    first(): CountryEntity | null { // explicitly allow null
        return this.countries[0] || null;
    }
}

export default new Countries();
