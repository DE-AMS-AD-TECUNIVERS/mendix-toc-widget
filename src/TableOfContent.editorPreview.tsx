import { ReactElement, createElement } from "react";
import { TableOfContentContainerProps } from "../typings/TableOfContentProps";

export function preview({ }: TableOfContentContainerProps): ReactElement {
    return <span>TOC preview</span>;
}

export function getPreviewCss(): string {
    return require("./ui/TableOfContent.css");
}
