type RandoOptions = {
    alphabet?: string;
    randomLength?: number;
    randomAlphabet?: string;
    isSortable?: boolean;
    sortableSeparator?: string;
    sortableAlphabet?: string;
    sortableLength?: number;
    sortableDate?: Date;
    sortableMaxDate?: Date;
    sortableTrim?: number;
};
export declare class Rando {
    readonly alphabet: string;
    readonly randomLength: number;
    readonly randomAlphabet: string;
    readonly randomBase: number;
    readonly isSortable: boolean;
    readonly sortableSeparator: string;
    readonly sortableLength: number;
    readonly sortableAlphabet: string;
    readonly sortableBase: number;
    readonly sortableDate: Date;
    constructor({ alphabet, randomLength, randomAlphabet, isSortable, sortableSeparator, sortableLength, sortableAlphabet, sortableDate, }?: RandoOptions);
    generate(): string;
    generateRandomString(): string;
    generateSortableString(): string;
    sortAlphabet(alphabet: string): string;
    decodeSortableString(encoded: string): Date;
}
export {};
