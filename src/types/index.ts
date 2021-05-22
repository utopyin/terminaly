import { CSSProperties } from 'react'

export interface customStyleInterface extends CSSProperties {
  keywordColor?: string;
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
  type: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseOver?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export interface errorInterface {
  commandName: string;
  natives: nativeCommandsInterface;
}

export type argumentType = 'string' | 'number' | 'keyword' | 'link' | 'any';

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

export interface nativeCommandsInterface {
  echo: (output: outputInterface) => void
}

export interface terminalyInterface {
  id?: string;
  customProps?: object;
  customStyle?: customStyleInterface;
  sessionName?: string;
}

export interface commandKeywordInterface {
  name: string,
  color?: string
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