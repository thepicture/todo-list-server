const NO_LOCALE: undefined = void 0;

export const areStringsSimilar = (
    thatOne: string,
    anotherOne: string,
): boolean =>
    thatOne.localeCompare(anotherOne, NO_LOCALE, { sensitivity: 'base' }) === 0;
