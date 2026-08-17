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

<div class="w-full bg-white border-b border-gray-100 shadow-sm relative z-0">
	<div 
		bind:this={scrollContainer}
		class="flex overflow-x-auto hide-scrollbar py-3 px-4 gap-2 snap-x snap-mandatory"
	>
		{#each items as item, i}
			{@const isActive = currentIndex === i}
			<button
				class="whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 snap-center
				{isActive ? 'bg-brand text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}"
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
