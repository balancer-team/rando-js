type DecodeLexOptions = {
    encoded: string;
    alphabet?: string;
};
export declare function sortAlphabet(alphabet: string): string;
export declare function decodeLex({ encoded, alphabet }: DecodeLexOptions): Date;
export {};
