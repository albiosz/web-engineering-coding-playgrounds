export { initSearchHighlighter };

const initSearchHighlighter = () => {
	document.querySelector('.search').addEventListener('submit', (e) => {
		e.preventDefault();

		document.querySelectorAll('.highlight').forEach(el => {
			var parent = el.parentNode;
			parent.replaceChild(document.createTextNode(el.textContent), el);
			parent.normalize();
		});

		// replaced `this` with `e.target` because `this` is not the form element when using an arrow function instead of a normal function
		const searchKey = e.target.q.value.trim();
		if (!searchKey) return;

		const regex = new RegExp('(' + searchKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');

		const walk = (node) => {
			// TODO: remove magic number
			if (node.nodeType === Node.TEXT_NODE) { // Text node 
				const match = node.nodeValue.match(regex);
				if (match) {
					const span = document.createElement('span');
					span.innerHTML = node.nodeValue.replace(regex, '<mark class="highlight">$1</mark>');
					node.replaceWith.apply(node, span.childNodes);
				}
			} 
			else if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'SCRIPT' && node.tagName !== 'STYLE' && node.tagName !== 'FORM') {
				// Create a static NodeList to avoid issues with DOM changes during iteration
				const childNodes = Array.from(node.childNodes);
				childNodes.forEach(walk);
			}
		}

		let articles = document.querySelectorAll('article');
		articles.forEach(walk);
	});
}
