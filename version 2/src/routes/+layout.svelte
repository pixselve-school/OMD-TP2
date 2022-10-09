<script>
import '../app.postcss';
import SvelteSeo from 'svelte-seo';
</script>

<SvelteSeo title='Kitten Editor' description='😺 Votre éditeur de texte préféré'
					 openGraph='{{title: "Kitten Editor", description: "😺 Votre éditeur de texte préféré", url: "https://tp2-omd.pages.dev", type: "website"}}'></SvelteSeo>

<main class='h-screen'>
	<slot />
</main>

