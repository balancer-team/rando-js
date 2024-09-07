type LexOptions = {
    date?: Date;
    alphabet?: string;
    maxDate?: Date | null;
};
type RandoOptions = {
    length?: number;
    alphabet?: string;
};
export declare function lex({ date, alphabet, maxDate }?: LexOptions): string;
export declare function rando({ length, alphabet }?: RandoOptions): string;
export {};
