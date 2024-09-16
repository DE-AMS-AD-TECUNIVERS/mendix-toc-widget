import { ReactElement, createElement } from "react";
import { GeneratedTableOfContent } from "./components/GeneratedTableOfContent";
import { TableOfContentPreviewProps } from "../typings/TableOfContentProps";

export function preview({ depth }: TableOfContentPreviewProps): ReactElement {
    return <GeneratedTableOfContent depth={depth ? depth : 3} />;
}

export function getPreviewCss(): string {
    return require("./ui/TableOfContent.css");
}
