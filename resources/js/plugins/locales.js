import supportedLocales from '@/data/supported-locales';

import { Locales } from '@/plugins/locales-manager.js';

let locales = new Locales(supportedLocales);
let Locale = locales.current();

export { locales as Locales, Locale };
