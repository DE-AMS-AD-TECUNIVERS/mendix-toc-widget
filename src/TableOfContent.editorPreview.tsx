import { ReactElement, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";
import { TableOfContentPreviewProps } from "../typings/TableOfContentProps";

export function preview({ sampleText }: TableOfContentPreviewProps): ReactElement {
    return <HelloWorldSample sampleText={sampleText} />;
}

export function getPreviewCss(): string {
    return require("./ui/TableOfContent.css");
}
