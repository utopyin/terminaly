import { CSSProperties } from 'react';
export interface customStyleInterface extends CSSProperties {
    keywordColor?: string;
    hideBar?: boolean;
}
export interface terminalyWindowInterface {
    id: string | number;
    customCommands: commandInterface[];
    customProps?: object;
    customStyle?: customStyleInterface;
    sessionName?: string;
}
export interface outputInterface {
    text: string;
    type: outputType;
    attachements?: attachementsInterface[];
    onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    onMouseOver?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
export interface errorInterface {
    commandName: string;
    natives: nativeFunctionsInterface;
}
export declare type argumentType = 'string' | 'number' | 'keyword' | 'link' | 'any';
export declare type outputType = 'success' | 'error' | 'link' | 'help' | 'any';
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
    dl: (file: fileInterface) => void;
}
export interface terminalyInterface {
    id?: string;
    customProps?: object;
    customStyle?: customStyleInterface;
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
export interface fileInterface {
    link: string;
    filename: string;
}
export interface attachementsInterface {
    image?: string;
    file: string;
}
//# sourceMappingURL=index.d.ts.map