import { useEffect } from "react";
import { useSearch } from "../../context/SearchContext";

export default function AutoHighlighter() {
    const { busca } = useSearch();

    useEffect(() => {
        const root = document.getElementById("content");
        if (!root) return;

        if (!busca.trim()) {
            removeMarks(root);
            return;
        }

        highlightText(root, busca);

        const primeiroMark = root.querySelector("mark[data-auto-highlight]");
        if (primeiroMark) {
            primeiroMark.scrollIntoView({
                behavior: "smooth", // animação suave
                block: "center"     // centraliza na tela
            });
        }
    }, [busca]);
}

function removeMarks(root) {
    root.querySelectorAll("mark[data-auto-highlight]").forEach(mark => {
        const parent = mark.parentNode;
        parent.replaceChild(document.createTextNode(mark.textContent), mark);
        parent.normalize();
    });
}

function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlightText(root, texto) {
    removeMarks(root);

    const walker = document.createTreeWalker(
        root,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );

    const nodes = [];
    let node;
    while ((node = walker.nextNode())) {
        nodes.push(node);
    }

    const regex = new RegExp(`(${escapeRegex(texto)})`, "gi");

    nodes.forEach(node => {
        const original = node.nodeValue;
        regex.lastIndex = 0;

        if (regex.test(original)) {
            regex.lastIndex = 0;
            const span = document.createElement("span");
            span.innerHTML = original.replace(
                regex,
                `<mark data-auto-highlight style="background:yellow; color:black; border-radius: 2px; padding: 0 2px;">$1</mark>`
            );
            node.parentNode.replaceChild(span, node);
        }
    });
}