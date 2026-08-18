<script lang="ts">
	import type { QiroItem } from '../data/qiro';

	let {
		items,
		currentIndex,
		onSelect
	}: {
		items: QiroItem[];
		currentIndex: number;
		onSelect: (index: number) => void;
	} = $props();

	let scrollContainer: HTMLElement;

	// Simple active effect
	$effect(() => {
		if (scrollContainer && currentIndex >= 0) {
			const activeEl = scrollContainer.children[currentIndex] as HTMLElement;
			if (activeEl) {
				const containerCenter = scrollContainer.clientWidth / 2;
				const itemCenter = activeEl.offsetLeft + activeEl.clientWidth / 2;
				scrollContainer.scrollTo({
					left: itemCenter - containerCenter,
					behavior: 'smooth'
				});
			}
		}
	});
</script>

<div class="w-full bg-white dark:bg-surface border-b border-gray-100 dark:border-gray-800 shadow-sm relative z-0 transition-colors duration-300">
	<div 
		bind:this={scrollContainer}
		class="flex overflow-x-auto hide-scrollbar py-3 px-4 gap-2 snap-x snap-mandatory"
	>
		{#each items as item, i}
			{@const isActive = currentIndex === i}
			<button
				class="whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 snap-center
				{isActive ? 'bg-brand text-white shadow-md' : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10'}"
				onclick={() => onSelect(i)}
				aria-label={item.title + (item.verseNumber ? ` ${item.verseNumber}` : '')}
				aria-current={isActive ? 'true' : undefined}
			>
				{#if item.type === 'verse'}
					{item.verseNumber}
				{:else}
					{item.title}
				{/if}
			</button>
		{/each}
	</div>
</div>

<style>
	/* Hide scrollbar for Chrome, Safari and Opera */
	.hide-scrollbar::-webkit-scrollbar {
		display: none;
	}

	/* Hide scrollbar for IE, Edge and Firefox */
	.hide-scrollbar {
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
	}
</style>
