import { codeToHtml } from 'https://esm.sh/shiki@1.0.0';

export default class Codeblock {
	constructor(element) {
		this.element = element;
		this.textarea = document.createElement('p');
		this.lang = element.dataset.syntax ? element.dataset.syntax : 'text';

		this.#init();
	}

	#init() {
		this.textarea.textContent = this.element.querySelector('code').innerText;
		this.textarea.setAttribute('contenteditable', 'true');
		this.element.appendChild(this.textarea);

		this.textarea.addEventListener('input', async () => {

			const code = await codeToHtml(this.textarea.innerText, { lang: this.lang, theme: 'monokai' });

			const newElement = document.createRange().createContextualFragment(code);

			this.element.querySelector('pre').replaceWith(newElement);

			this.element.querySelector('code').scrollLeft = this.textarea.scrollLeft;

		});

		this.textarea.addEventListener('scroll', (e) => {
			this.element.querySelector('code').scrollLeft = this.textarea.scrollLeft;
		});
	}
}