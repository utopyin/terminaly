import { CSSProperties } from 'react'

export interface customStyleInterface extends CSSProperties {
  keywordColor: string;
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
  args: string[];
  natives: nativeCommandsInterface;
}

export interface commandInterface {
  name: string;
  keywordColor?: string;
  handler(args: string[]): outputInterface;
}

export interface nativeCommandsInterface {
  echo: (output: outputInterface) => void
}

export interface terminalyInterface {
  id: string;
  customCommands: commandInterface[];
  customProps?: object;
  customStyle?: customStyleInterface;
  sessionName?: string;
}

export interface commandKeywordInterface {
  name: string,
  color?: string
}
