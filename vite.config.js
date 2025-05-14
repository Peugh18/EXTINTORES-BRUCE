import path from 'node:path';  // Importa módulo path para resolver rutas absolutas
import react from '@vitejs/plugin-react';  // Plugin oficial para soporte React en Vite
import { createLogger, defineConfig } from 'vite';  // Importa funciones para crear logger personalizado y configurar Vite

// Código inyectado para manejar errores visuales de Vite en el navegador
const configHorizonsViteErrorHandler = `
const observer = new MutationObserver((mutations) => {
	for (const mutation of mutations) {
		for (const addedNode of mutation.addedNodes) {
			if (
				addedNode.nodeType === Node.ELEMENT_NODE &&
				(
					addedNode.tagName?.toLowerCase() === 'vite-error-overlay' ||
					addedNode.classList?.contains('backdrop')
				)
			) {
				handleViteOverlay(addedNode);
			}
		}
	}
});

observer.observe(document.documentElement, {
	childList: true,
	subtree: true
});

function handleViteOverlay(node) {
	if (!node.shadowRoot) {
		return;
	}

	const backdrop = node.shadowRoot.querySelector('.backdrop');

	if (backdrop) {
		const overlayHtml = backdrop.outerHTML;
		const parser = new DOMParser();
		const doc = parser.parseFromString(overlayHtml, 'text/html');
		const messageBodyElement = doc.querySelector('.message-body');
		const fileElement = doc.querySelector('.file');
		const messageText = messageBodyElement ? messageBodyElement.textContent.trim() : '';
		const fileText = fileElement ? fileElement.textContent.trim() : '';
		const error = messageText + (fileText ? ' File:' + fileText : '');

		// Envía el error al padre para manejo personalizado
		window.parent.postMessage({
			type: 'horizons-vite-error',
			error,
		}, '*');
	}
}
`;

// Código para capturar errores de ejecución en tiempo real y enviarlos al padre
const configHorizonsRuntimeErrorHandler = `
window.onerror = (message, source, lineno, colno, errorObj) => {
	const errorDetails = errorObj ? JSON.stringify({
		name: errorObj.name,
		message: errorObj.message,
		stack: errorObj.stack,
		source,
		lineno,
		colno,
	}) : null;

	// Envía error runtime al padre
	window.parent.postMessage({
		type: 'horizons-runtime-error',
		message,
		error: errorDetails
	}, '*');
};
`;

// Código para interceptar errores en consola y enviarlos al padre
const configHorizonsConsoleErrroHandler = `
const originalConsoleError = console.error;
console.error = function(...args) {
	originalConsoleError.apply(console, args);

	let errorString = '';

	for (let i = 0; i < args.length; i++) {
		const arg = args[i];
		if (arg instanceof Error) {
			errorString = arg.stack || \`\${arg.name}: \${arg.message}\`;
			break;
		}
	}

	if (!errorString) {
		errorString = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' ');
	}

	// Envía el error de consola al padre
	window.parent.postMessage({
		type: 'horizons-console-error',
		error: errorString
	}, '*');
};
`;

// Código para interceptar llamadas fetch y loguear errores de red que no sean HTML
const configWindowFetchMonkeyPatch = `
const originalFetch = window.fetch;

window.fetch = function(...args) {
	const url = args[0] instanceof Request ? args[0].url : args[0];

	// Ignora URLs WebSocket
	if (url.startsWith('ws:') || url.startsWith('wss:')) {
		return originalFetch.apply(this, args);
	}

	return originalFetch.apply(this, args)
		.then(async response => {
			const contentType = response.headers.get('Content-Type') || '';

			// Ignora respuestas HTML
			const isDocumentResponse =
				contentType.includes('text/html') ||
				contentType.includes('application/xhtml+xml');

			if (!response.ok && !isDocumentResponse) {
					const responseClone = response.clone();
					const errorFromRes = await responseClone.text();
					const requestUrl = response.url;
					console.error(\`Fetch error from \${requestUrl}: \${errorFromRes}\`);
			}

			return response;
		})
		.catch(error => {
			if (!url.match(/\.html?$/i)) {
				console.error(error);
			}

			throw error;
		});
};
`;

// Plugin personalizado para inyectar scripts en el HTML de índice
const addTransformIndexHtml = {
	name: 'add-transform-index-html',
	transformIndexHtml(html) {
		return {
			html,
			tags: [
				{
					tag: 'script',
					attrs: { type: 'module' },
					children: configHorizonsRuntimeErrorHandler,  // Manejo de errores runtime
					injectTo: 'head',
				},
				{
					tag: 'script',
					attrs: { type: 'module' },
					children: configHorizonsViteErrorHandler,  // Manejo overlay errores vite
					injectTo: 'head',
				},
				{
					tag: 'script',
					attrs: {type: 'module'},
					children: configHorizonsConsoleErrroHandler,  // Manejo errores consola
					injectTo: 'head',
				},
				{
					tag: 'script',
					attrs: { type: 'module' },
					children: configWindowFetchMonkeyPatch,  // Intercepta fetch para errores
					injectTo: 'head',
				},
			],
		};
	},
};

console.warn = () => {};  // Sobrescribe console.warn para que no muestre advertencias

const logger = createLogger();  // Crea logger personalizado de Vite
const loggerError = logger.error;  // Guarda referencia al método error original

// Sobrescribe logger.error para filtrar ciertos errores CSS específicos
logger.error = (msg, options) => {
	if (options?.error?.toString().includes('CssSyntaxError: [postcss]')) {
		// Ignora estos errores CSS
		return;
	}

	// Ejecuta el logger error original para otros casos
	loggerError(msg, options);
}

// Exporta la configuración de Vite
export default defineConfig({
	customLogger: logger,  // Usa logger personalizado
	plugins: [react(), addTransformIndexHtml],  // Usa plugin React y plugin de inyección HTML
	server: {
		cors: true,
		headers: {
			'Cross-Origin-Embedder-Policy': 'credentialless',  // Configura política CORS
		},
		allowedHosts: true,  // Permite todos los hosts
	},
	resolve: {
		extensions: ['.jsx', '.js', '.tsx', '.ts', '.json'],  // Extensiones que resuelve automáticamente
		alias: {
			'@': path.resolve(__dirname, './src'),  // Alias @ apunta a ./src
		},
	},
});
