import Codeblock from "./Codeblock.js";

window.addEventListener("DOMContentLoaded", () => {
	const codeblocks = document.querySelectorAll(".codeblock");

	codeblocks.forEach(codeblock => new Codeblock(codeblock));
});