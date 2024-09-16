import { ReactElement, createElement, useRef, useEffect} from "react";
import { GeneratedTableOfContent } from "./components/GeneratedTableOfContent";
import { TableOfContentContainerProps } from "../typings/TableOfContentProps";

import "./ui/TableOfContent.css";

var nextId = 1;
var baseChar = "A".charCodeAt(0);

class TocEntry {
  id: string;
  level: string;
  content: string;
  placeholder: string;

  constructor(id: string, level: string, content: string, placeholder: string) {  
    this.id = id;
    this.level = level;
    this.content = content;
    this.placeholder = placeholder;
  }
}

function calculateSelector(depth: number): string {
    var selector = 'h1.toc';
    var i = 1;
    while (i < depth) {
        i++;
        selector = selector + ',h' + i + '.toc';        
    }
    return selector;
}

function createTableOfContents(content: HTMLElement, depth: number): void {              
    const tocHeaders: NodeListOf<HTMLElement> = content.querySelectorAll(calculateSelector(depth));
    console.info(tocHeaders.length + " Headers found.");
    Array.from(tocHeaders).forEach((tocHeader) => {
        updateTableOfContents(tocHeader);
    });    
};

function updateTableOfContents(node: HTMLElement): void {
    console.info("Header " + (node.textContent || "").trim() + " [" + node.id + "] found.");
    var placeHolderHi = ((nextId-1) / 26) >> 0;
    var placeHolderLo = ((nextId-1) % 26);
    node.setAttribute("page-number-placeholder", "@" + String.fromCharCode(baseChar + placeHolderHi) + String.fromCharCode(baseChar + placeHolderLo));
    if (!node.id) {
        var newId = `toc-item-${nextId}`;
        console.info("Setting id for target element: " + newId)
        node.setAttribute("id", newId);
        nextId = nextId + 1;
    }
    console.info("Creating toc entry for " + node.id);
    var level = node.tagName.toLowerCase().replace('h', 'toc-element-level-');
    var placeholder = "@" + String.fromCharCode(baseChar + placeHolderHi) + String.fromCharCode(baseChar + placeHolderLo);
    var tocEntry: TocEntry = new TocEntry(node.id, level, node.textContent || "", placeholder);
    addEntry(tocEntry);
}

function addEntry(tocEntry: TocEntry) {
    const node: HTMLElement | null = document.querySelector("#list-toc-generated");
    if(node !== null) {
        const listItem = document.createElement('li');
        listItem.classList.add('toc-element');
        listItem.classList.add(tocEntry.level);
        const link = document.createElement('a');
        link.setAttribute('href', `#${tocEntry.id}`);
        link.setAttribute("page-number-placeholder", tocEntry.placeholder);
        link.textContent = tocEntry.content;
        listItem.append(link);
        node.append(listItem);    
    }
    else {
        console.warn("Could not find <ul> with id #list-toc-generated");
    }
}  

export function TableOfContent({ content, depth }: TableOfContentContainerProps): ReactElement {
    const contentContainerRef = useRef<HTMLDivElement>(null);

    console.info("Depth is " + depth);
    useEffect(() => {
        if (contentContainerRef.current) {
            createTableOfContents(contentContainerRef.current, depth);
        }
        return () => {
            console.info("TOC created.");
        };
    }, [contentContainerRef]);

    return (
        <div className={"table-of-content"}>
            <GeneratedTableOfContent />
            <div ref={contentContainerRef}>{content}</div>
        </div>
    );
}
