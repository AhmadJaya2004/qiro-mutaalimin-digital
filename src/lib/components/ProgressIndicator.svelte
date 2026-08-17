<script lang="ts">
	let { total, current, onSelect }: { total: number; current: number; onSelect: (index: number) => void } = $props();
</script>

<div class="flex items-center justify-center gap-1.5 py-4">
	{#each Array(total) as _, i}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div 
			class="flex items-center justify-center cursor-pointer p-1"
			onclick={() => onSelect(i)}
		>
			<div 
				class="rounded-full transition-all duration-300
				{i === current ? 'w-2 h-2 bg-brand scale-125' : 
				 i < current ? 'w-1.5 h-1.5 bg-brand-light/50' : 
				 'w-1.5 h-1.5 bg-gray-300'}"
			></div>
		</div>
		{#if i < total - 1}
			<div class="w-2 h-[1px] {i < current ? 'bg-brand-light/30' : 'bg-gray-200'}"></div>
		{/if}
	{/each}
</div>
