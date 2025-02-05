type RandoOptions = {
    alphabet?: string;
    length?: number;
    sortable?: boolean;
    supportDate?: Date;
};
type GenerateOptions = {
    date?: Date;
};
export declare class Rando {
    readonly alphabet: string;
    readonly length: number;
    readonly randomLength: number;
    readonly base: number;
    readonly randomBits: number;
    readonly randomLimit: number;
    readonly sortable: boolean;
    readonly supportDate: Date;
    readonly sortableLength: number;
    readonly sortableLimit: Date;
    constructor({ alphabet, length, sortable, supportDate, }?: RandoOptions);
    generate({ date }?: GenerateOptions): string;
    generateRandomSegment(): string;
    generateSortableSegment({ date }?: GenerateOptions): string;
    getRandomSegment(id: string): string;
    getSortableSegment(id: string): string;
    sortAlphabet(alphabet: string): string;
    getDate(id: string): Date | null;
}
export {};
