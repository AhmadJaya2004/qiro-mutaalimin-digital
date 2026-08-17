<script lang="ts">
	import { qiroItems } from '$lib/data/qiro';
	import VerseNavigation from '$lib/components/VerseNavigation.svelte';
	import QiroPlayer from '$lib/components/QiroPlayer.svelte';
	import ProgressIndicator from '$lib/components/ProgressIndicator.svelte';
	import LearningGuide from '$lib/components/LearningGuide.svelte';

	let currentIndex = $state(0);
	
	let currentItem = $derived(qiroItems[currentIndex]);
	let isFirst = $derived(currentIndex === 0);
	let isLast = $derived(currentIndex === qiroItems.length - 1);

	function handleSelect(index: number) {
		currentIndex = index;
	}

	function handleNext() {
		if (!isLast) currentIndex++;
	}

	function handlePrev() {
		if (!isFirst) currentIndex--;
	}
</script>

<svelte:head>
	<title>Qiro' Digital - TPQ Bu Suprih</title>
</svelte:head>

<VerseNavigation 
	items={qiroItems} 
	{currentIndex} 
	onSelect={handleSelect} 
/>

<div class="flex-1 flex flex-col items-center w-full relative z-0">
	<QiroPlayer 
		item={currentItem}
		{isFirst}
		{isLast}
		onNext={handleNext}
		onPrev={handlePrev}
	/>

	<ProgressIndicator 
		total={qiroItems.length}
		current={currentIndex}
		onSelect={handleSelect}
	/>

	<div class="mt-auto w-full pb-8">
		<LearningGuide />
	</div>
</div>
