<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="min-h-screen flex flex-col items-center justify-start bg-background">
	<!-- Mobile-first container -->
	<div class="w-full max-w-[420px] md:max-w-[768px] min-h-screen flex flex-col bg-surface shadow-sm sm:shadow-xl sm:my-8 sm:rounded-2xl sm:min-h-[calc(100vh-4rem)] overflow-hidden">
		<!-- Header -->
		<header class="bg-brand text-white p-6 text-center rounded-b-3xl sm:rounded-b-none sm:rounded-t-2xl shadow-md z-10">
			<h1 class="text-2xl font-bold tracking-wider mb-1">QIRO' DIGITAL</h1>
			<p class="text-brand-light font-medium text-sm mb-3 text-emerald-200">TPQ Bu Suprih</p>
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
		<footer class="mt-auto py-6 border-t border-gray-100 bg-gray-50 text-center">
			<p class="text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wider">
				Media Digital Qiro' <br />
				TPQ Bu Suprih <br />
				KKN Panggunguni 2026
			</p>
		</footer>
	</div>
</div>
