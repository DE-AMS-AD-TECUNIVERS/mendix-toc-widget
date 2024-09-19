import { ReactElement, MutableRefObject, createElement, useRef, useEffect} from "react";
import { createTableOfContents } from "./components/GeneratedTableOfContent";
import { TableOfContentContainerProps } from "../typings/TableOfContentProps";

import "./ui/TableOfContent.css";

export function TableOfContent({ name, content, depth }: TableOfContentContainerProps): ReactElement {
    const contentContainerRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

    const mutationObserver = new MutationObserver(async(mutations:MutationRecord[]) => {
        mutations.forEach((mutation: MutationRecord)=>{
           if (mutation.type == "childList") {            
                mutation.addedNodes.forEach((addedNode: HTMLElement) => {    
                    if (addedNode.tagName !== "LI" || !addedNode.classList.contains("toc-entry")) {
                        createTableOfContents(addedNode, name, depth);
                    }
                });
           }
           else {
                if (1 == 1) {
                }
                else {
                   createTableOfContents(contentContainerRef.current, name, depth);
                }
           }           
        });
    });
    
    useEffect(() => {
        if (contentContainerRef.current) {
            createTableOfContents(contentContainerRef.current, name, depth);
            mutationObserver.observe(contentContainerRef.current, {
                childList: true,
                subtree: true
            });

            return () => {
                mutationObserver.disconnect();
            };
        }
    }, [contentContainerRef]);
    
    return (
        <div id={name} className={"table-of-content-widget"}>
            <div ref={contentContainerRef}>{content}</div>
        </div>        
    );
}