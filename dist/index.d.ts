type RandoOptions = {
    alphabet?: string;
    randomAlphabet?: string;
    randomLength?: number;
    includeTimestamp?: boolean;
    obfuscateTimestamp?: boolean;
    timestampPosition?: 'start' | 'end';
    timestampSeparator?: string;
    timestampAlphabet?: string;
    timestampLength?: number;
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
    readonly timestampSeparator: string;
    readonly timestampAlphabet: string;
    readonly timestampLength: number;
    readonly timestampBase: number;
    readonly timestampMax: Date;
    private lastTimestamp;
    private lastRandomSegments;
    constructor({ alphabet, randomLength, randomAlphabet, includeTimestamp, obfuscateTimestamp, timestampPosition, timestampSeparator, timestampAlphabet, timestampLength, }?: RandoOptions);
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
        timestampSeparator: string;
        timestampAlphabet: string;
        timestampLength: number;
        timestampBase: number;
        timestampMax: Date;
        overallLength: number;
    };
}
export {};
