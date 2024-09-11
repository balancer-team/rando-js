type RandoOptions = {
    alphabet?: string;
    randomLength?: number;
    randomAlphabet?: string;
    isSortable?: boolean;
    sortableSeparator?: string;
    sortableAlphabet?: string;
    sortableLength?: number;
};
type GenerateOptions = {
    date?: Date;
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
    constructor({ alphabet, randomLength, randomAlphabet, isSortable, sortableSeparator, sortableLength, sortableAlphabet, }?: RandoOptions);
    generate({ date }?: GenerateOptions): string;
    generateRandomSegment(): string;
    generateSortableSegment({ date }?: GenerateOptions): string;
    sortAlphabet(alphabet: string): string;
    decodeSortable(id: string): Date;
}
export {};
