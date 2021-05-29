import { CSSProperties } from 'react';
export declare type boolish = "true" | "false" | boolean;
export interface customStyleInterface extends CSSProperties {
    terminaly?: CSSProperties;
    bar?: CSSProperties;
    input?: {
        container: CSSProperties;
        name: CSSProperties;
        field: CSSProperties;
    };
    outputs?: {
        container: CSSProperties;
        item: CSSProperties;
    };
    variables?: {};
    textColor?: string | number;
    keywordColor?: string | number;
}
export interface themeInterface {
    terminaly: CSSProperties;
    bar: CSSProperties;
    input: {
        container: CSSProperties;
        name: CSSProperties;
        field: CSSProperties;
    };
    outputs: {
        container: CSSProperties;
        item: CSSProperties;
    };
    variables: {};
}
export interface stylePropertyInterface {
    theme: "default" | "grass";
    custom?: customStyleInterface;
}
export interface outputsProps {
    outputs: outputInterface[];
}
export interface attachsProps {
    attachments: attachementsInterface[] | undefined;
}
export interface terminalyWindowInterface {
    id: string | number;
    customCommands: commandInterface[];
    customProps?: object;
    customStyle?: stylePropertyInterface;
    sessionName?: string;
}
export interface outputInterface {
    text: string;
    type: 'success' | 'error' | 'link' | 'help' | 'any';
    attachments?: attachementsInterface[];
    onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    onMouseOver?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
export interface errorInterface {
    commandName: string;
    natives: nativeFunctionsInterface;
}
export declare type argumentType = 'string' | 'number' | 'keyword' | 'link' | 'any';
export interface argumentInterface {
    required: boolean;
    type: argumentType;
}
export interface commandInterface {
    name: string;
    keywordColor?: string;
    onArgumentError?(badArgs: badArgsInterface[]): void;
    handler(args: string[]): outputInterface;
    arguments: argumentInterface[];
}
export interface nativeFunctionsInterface {
    echo: (output: outputInterface) => void;
}
export interface terminalyInterface {
    id?: string;
    style: stylePropertyInterface;
    customProps?: object;
    sessionName?: string;
}
export interface commandKeywordInterface {
    name: string;
    color?: string;
}
export interface badArgsInterface {
    argument: string | number | undefined;
    message: string;
}
export interface checkArgsInterface {
    argument: string | number | undefined;
    isValid: boolean;
    message: string;
}
/**
 * Warning
 * @param link must be an URL link and not an file relative path
 */
export interface attachementsInterface {
    filename?: string;
    link: string;
}
//# sourceMappingURL=index.d.ts.map