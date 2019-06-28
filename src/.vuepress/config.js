module.exports = {
	title: 'drdrdr',
	dest: './public',
	themeConfig: {
		domain: 'https://www.drdrdr.de',
		repo: 'https://github.com/qdr/',
		repoLabel: 'Repo',
		docsDir: 'src',
		editLinks: true,
		logo: '/do-logo.png',
		lastUpdated: 'Last Updated',
		editLinkText: 'Open a new issue',
		nav: [
			{ text: 'Item Flow', link: '/item-flow/index.html' },

			{ text: 'Link List', link: '/link-lists/index.html' },
			// {
			// 	text: 'Projects',
			// 	items: [
					
			// 	]
			// },
			{ text: 'About', link: '/about/index.html' },
		],
	
	},
	plugins: [
		[
			'@vuepress/google-analytics',
			{
				ga: ''
			}	
		],
		[
			'vuepress-plugin-rss',
			{
				base_url: '/',
				site_url: 'https://www.drdrdr.de',
				filter: frontmatter => frontmatter.date <= new Date(),
				count: 20
			}
		],
		'vuepress-plugin-janitor'
	],
	head: [
		[
			'link',
			{
				rel: 'stylesheet',
				href:
					'https://fonts.googleapis.com/css?family=PT+Serif:400,700|Poppins:500,700'
			}
		],
		['link', { rel: 'manifest', href: '/manifest.json' }],
		['meta', { name: 'msapplication-TileColor', content: '#ffffff' }],
		[
			'meta',
			{ name: 'msapplication-TileImage', content: '/ms-icon-144x144.png' }
		],
		['meta', { name: 'theme-color', content: '#ffffff' }],
	]
}
