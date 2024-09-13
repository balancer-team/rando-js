type RandoOptions = {
    alphabet?: string;
    length?: number;
    sortable?: 'prefix' | 'suffix';
    sortableSeparator?: string;
    sortableAlphabet?: string;
    sortableLength?: number;
};
type GenerateOptions = {
    date?: Date;
};
export declare class Rando {
    readonly alphabet: string;
    readonly length: number;
    readonly base: number;
    readonly sortable?: string;
    readonly sortableSeparator: string;
    readonly sortableLength: number;
    readonly sortableAlphabet: string;
    readonly sortableBase: number;
    readonly maxDate: Date;
    readonly bitsOfEntropy: number;
    constructor({ alphabet, length, sortable, sortableSeparator, sortableLength, sortableAlphabet, }?: RandoOptions);
    generate({ date }?: GenerateOptions): string;
    generateRandomSegment(): string;
    generateSortableSegment({ date }?: GenerateOptions): string;
    sortAlphabet(alphabet: string): string;
    getDate(id: string): Date;
    getInfo(): {
        alphabet: string;
        length: number;
        base: number;
        sortable: string | undefined;
        sortableSeparator: string;
        sortableLength: number;
        sortableAlphabet: string;
        sortableBase: number;
        maxDate: Date;
        bitsOfEntropy: number;
    };
}
export {};
