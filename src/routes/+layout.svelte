<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import logoUin from '$lib/assets/Logo_UIN.png';
	import logoKkn from '$lib/assets/Logo_KKN.png';
	import { onMount } from 'svelte';

	let { children } = $props();
	
	let isDark = $state(false);

	onMount(() => {
		isDark = document.documentElement.classList.contains('dark');
	});

	function toggleTheme() {
		isDark = !isDark;
		if (isDark) {
			document.documentElement.classList.add('dark');
			localStorage.setItem('theme', 'dark');
		} else {
			document.documentElement.classList.remove('dark');
			localStorage.setItem('theme', 'light');
		}
	}
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="min-h-screen flex flex-col items-center justify-start bg-background">
	<!-- Mobile-first container -->
	<div class="w-full max-w-[420px] md:max-w-[768px] min-h-screen flex flex-col bg-surface shadow-sm sm:shadow-xl sm:my-8 sm:rounded-2xl sm:min-h-[calc(100vh-4rem)] overflow-hidden transition-colors duration-300">
		<!-- Header -->
		<header class="bg-brand text-white p-6 text-center rounded-b-3xl sm:rounded-b-none sm:rounded-t-2xl shadow-md z-10 relative">
			<button 
				onclick={toggleTheme} 
				class="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
				aria-label="Toggle Dark Mode"
			>
				{#if isDark}
					<span class="text-xl leading-none">☀️</span>
				{:else}
					<span class="text-xl leading-none">🌙</span>
				{/if}
			</button>
			<div class="flex justify-between items-center w-full max-w-[280px] mx-auto mb-5">
				<img src={logoUin} alt="UIN SATU Logo" class="h-11 w-auto object-contain drop-shadow-sm" />
				<img src={logoKkn} alt="KKN Panggunguni Logo" class="h-11 w-auto object-contain drop-shadow-sm" />
			</div>
			<h1 class="text-2xl font-bold tracking-wider mb-1">QIRO' DIGITAL</h1>
			<p class="text-brand-light font-medium text-sm mb-3 text-emerald-200">TPQ Al-Mutaalimin</p>
			<div class="bg-black/20 rounded-lg p-3 inline-block max-w-[90%]">
				<p class="text-xs text-white/90 leading-relaxed italic">
					Media pembelajaran Qiro' untuk mendengar, menirukan, dan mengulang bacaan.
				</p>
			</div>
		</header>

		<!-- Main Content Area -->
		<main class="flex-1 flex flex-col w-full relative">
			{@render children()}
		</main>

		<!-- Footer -->
		<footer class="mt-auto py-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-black/10 text-center transition-colors duration-300">
			<p class="text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wider">
				Media Digital Qiro' <br />
				TPQ Al-Mutaalimin <br />
				KKN Panggunguni 2026
			</p>
		</footer>
	</div>
</div>
