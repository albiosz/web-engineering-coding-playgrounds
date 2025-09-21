// Search highlighter
const initSearchHighlighter = () => {
	document.querySelector('.search').addEventListener('submit', function(e) {
		e.preventDefault();

		document.querySelectorAll('.highlight').forEach(function(el) {
			var parent = el.parentNode;
			parent.replaceChild(document.createTextNode(el.textContent), el);
			parent.normalize();
		});

		var searchKey = this.q.value.trim();
		if (!searchKey) return;

		var regex = new RegExp('(' + searchKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');

		const walk = (node) => {
			// TODO: remove magic number
			if (node.nodeType === Node.TEXT_NODE) { // Text node 
				var match = node.nodeValue.match(regex);
				if (match) {
					var span = document.createElement('span');
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

export { initSearchHighlighter };