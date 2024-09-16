import { ReactElement, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";

import { TableOfContentContainerProps } from "../typings/TableOfContentProps";

import "./ui/TableOfContent.css";

export function TableOfContent({ sampleText }: TableOfContentContainerProps): ReactElement {
    return <HelloWorldSample sampleText={sampleText ? sampleText : "World"} />;
}
