type Options = {
    length?: number;
    alphabet?: string;
    sortable?: boolean;
    separator?: string;
};
export declare function sid({ length, alphabet, sortable, separator }?: Options): string;
export declare function encodeTimestamp(alphabet?: string): string;
export declare function decodeTimestamp(encodedTimestamp: string, alphabet?: string): Date;
export {};
