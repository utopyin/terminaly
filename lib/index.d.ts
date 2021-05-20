import React from "react";
import '../styles/index.css';
interface customStyle extends React.CSSProperties {
    keywordColor: string;
}
interface props {
    sessionName?: string;
    id?: string | number;
    customProps: object;
    customStyle: customStyle;
}
export interface Output {
    text: string;
    type: string;
    onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    onHover?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
declare const Terminaly: ({ sessionName, customProps, customStyle }: props) => JSX.Element;
export default Terminaly;
//# sourceMappingURL=index.d.ts.map