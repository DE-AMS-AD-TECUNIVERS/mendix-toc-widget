import { ReactElement, createElement } from "react";

export interface GeneratedTableOfContentProps {
    depth?: number;
}

export function GeneratedTableOfContent({}: GeneratedTableOfContentProps): ReactElement {
    return (
        <ul id="list-toc-generated"></ul>
    );
}
