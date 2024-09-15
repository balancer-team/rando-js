type RandoOptions = {
    alphabet?: string;
    randomAlphabet?: string;
    randomLength?: number;
    includeTimestamp?: boolean;
    obfuscateTimestamp?: boolean;
    timestampPosition?: 'start' | 'end';
    timestampAlphabet?: string;
    timestampLength?: number;
    prefix?: string;
    separator?: string;
    suffix?: string;
};
type GenerateOptions = {
    date?: Date;
};
type GenerateTimestampOptions = {
    date?: Date;
    randomSegment?: string;
};
export declare class Rando {
    readonly alphabet: string;
    readonly randomAlphabet: string;
    readonly randomLength: number;
    readonly randomBase: number;
    readonly randomEntropy: number;
    readonly includeTimestamp?: boolean;
    readonly obfuscateTimestamp: boolean;
    readonly timestampPosition: 'start' | 'end';
    readonly timestampAlphabet: string;
    readonly timestampLength: number;
    readonly timestampBase: number;
    readonly timestampMax: Date;
    readonly prefix: string;
    readonly separator: string;
    readonly suffix: string;
    constructor({ alphabet, randomLength, randomAlphabet, includeTimestamp, obfuscateTimestamp, timestampPosition, timestampAlphabet, timestampLength, prefix, separator, suffix, }?: RandoOptions);
    generate({ date }?: GenerateOptions): string;
    generateRandomSegment(): string;
    obfuscateTimestampSegment({ randomSegment, timestampSegment, }: {
        randomSegment: string;
        timestampSegment: string;
    }): string;
    deobfuscateTimestampSegment({ randomSegment, timestampSegment, }: {
        randomSegment: string;
        timestampSegment: string;
    }): string;
    generateTimestampSegment({ date, randomSegment }?: GenerateTimestampOptions): string;
    getRandomSegment(id: string): string;
    getTimestampSegment(id: string): string;
    generateOffset(randomSegment: string): number;
    sortAlphabet(alphabet: string): string;
    getDate(id: string): Date;
    getInfo(): {
        alphabet: string;
        randomAlphabet: string;
        randomLength: number;
        randomBase: number;
        randomEntropy: number;
        includeTimestamp: boolean | undefined;
        obfuscateTimestamp: boolean;
        timestampPosition: "start" | "end";
        timestampAlphabet: string;
        timestampLength: number;
        timestampBase: number;
        timestampMax: Date;
        separator: string;
        totalLength: number;
    };
}
export {};
