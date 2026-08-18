<script lang="ts">
	import type { QiroItem } from '../data/qiro';
	import { untrack } from 'svelte';

	let {
		item,
		isFirst,
		isLast,
		onNext,
		onPrev
	}: {
		item: QiroItem;
		isFirst: boolean;
		isLast: boolean;
		onNext: () => void;
		onPrev: () => void;
	} = $props();

	let audioElement: HTMLAudioElement;
	let currentTime = $state(0);
	let duration = $state(0);
	let paused = $state(true);

	// Player options
	let autoNext = $state(false);
	
	// Repeat logic
	const repeatOptions = [1, 3, 5, Infinity];
	let repeatOptionIndex = $state(0);
	let currentRepeatCount = $state(1);

	let repeatValue = $derived(repeatOptions[repeatOptionIndex]);

	function toggleRepeat() {
		repeatOptionIndex = (repeatOptionIndex + 1) % repeatOptions.length;
		currentRepeatCount = 1;
	}

	function handleEnded() {
		if (currentRepeatCount < repeatValue) {
			currentRepeatCount++;
			audioElement.currentTime = 0;
			audioElement.play();
		} else {
			currentRepeatCount = 1;
			if (autoNext && !isLast) {
				onNext();
			}
		}
	}

	// Reset player state when item changes
	$effect(() => {
		// When item.id changes, reset
		if (item.id) {
			untrack(() => {
				paused = true;
				currentTime = 0;
				currentRepeatCount = 1;
				if (audioElement) {
					audioElement.currentTime = 0;
				}
			});
		}
	});

	function formatTime(seconds: number) {
		if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
		const m = Math.floor(seconds / 60);
		const s = Math.floor(seconds % 60);
		return `${m}:${s < 10 ? '0' : ''}${s}`;
	}

	function togglePlay() {
		if (paused) {
			audioElement.play().catch(e => console.error("Playback failed:", e));
		} else {
			audioElement.pause();
		}
	}

	function handleSeek(e: Event) {
		const target = e.target as HTMLInputElement;
		audioElement.currentTime = Number(target.value);
	}
</script>

<div class="flex flex-col items-center w-full max-w-sm mx-auto p-4 flex-1">
	
	<!-- Header -->
	<div class="text-center mb-8 w-full mt-4">
		<h2 class="text-brand font-bold text-lg uppercase tracking-wider">{item.title}</h2>
		{#if item.type === 'verse'}
			<p class="text-gray-500 dark:text-gray-400 font-medium text-sm mt-1">Ayat {item.verseNumber} / 5</p>
		{/if}
		<p class="text-xs text-gray-400 dark:text-gray-500 mt-2 font-medium">Qari: Muhammad Ghazi Al-Ghifari</p>
	</div>

	<!-- Arabic Text Container -->
	<div class="w-full flex-1 flex items-center justify-center min-h-[150px] mb-8">
		<p 
			class="font-arabic text-3xl sm:text-4xl text-center leading-[1.8] sm:leading-[1.8] text-gray-800 dark:text-gray-100"
			dir="rtl"
		>
			{item.arabic}
		</p>
	</div>

	<!-- Audio Element (Hidden) -->
	<audio 
		bind:this={audioElement} 
		bind:currentTime 
		bind:duration 
		bind:paused
		onended={handleEnded}
		src={item.audio}
		preload="auto"
	></audio>

	<!-- Player Controls -->
	<div class="w-full bg-white/50 dark:bg-black/20 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-brand/10 dark:border-brand/20">
		
		<!-- Top Options (Repeat & Auto Next) -->
		<div class="flex justify-between items-center mb-4 text-xs font-medium text-gray-500 dark:text-gray-400">
			<button 
				class="flex items-center gap-1.5 px-2 py-1.5 rounded-md transition-colors {repeatValue > 1 ? 'bg-brand/10 text-brand dark:text-emerald-400' : 'hover:bg-gray-100 dark:hover:bg-white/5'}"
				onclick={toggleRepeat}
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/></svg>
				Ulangi {repeatValue === Infinity ? '∞' : repeatValue + '×'}
				{#if repeatValue > 1}
					<span class="text-[10px] ml-1 bg-brand text-white px-1 rounded-sm">{currentRepeatCount}/{repeatValue === Infinity ? '∞' : repeatValue}</span>
				{/if}
			</button>

			<label class="flex items-center gap-2 cursor-pointer">
				<span class="uppercase tracking-wide text-[10px] {autoNext ? 'text-brand dark:text-emerald-400' : 'text-gray-400 dark:text-gray-500'}">Auto Lanjut</span>
				<div class="relative">
					<input type="checkbox" bind:checked={autoNext} class="sr-only" />
					<div class="block w-8 h-4.5 rounded-full {autoNext ? 'bg-brand' : 'bg-gray-200 dark:bg-gray-700'} transition-colors"></div>
					<div class="dot absolute left-0.5 top-0.5 bg-white w-3.5 h-3.5 rounded-full transition-transform {autoNext ? 'translate-x-3.5' : ''}"></div>
				</div>
			</label>
		</div>

		<!-- Progress Bar -->
		<div class="mb-5 relative group">
			<input 
				type="range" 
				min="0" 
				max={duration || 100} 
				value={currentTime} 
				oninput={handleSeek}
				class="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-brand"
			/>
			<div class="flex justify-between text-xs text-gray-400 dark:text-gray-500 mt-1.5 font-medium">
				<span>{formatTime(currentTime)}</span>
				<span>{formatTime(duration)}</span>
			</div>
		</div>

		<!-- Main Playback Buttons -->
		<div class="flex items-center justify-between px-2">
			<button 
				class="p-2 text-gray-400 hover:text-brand dark:hover:text-emerald-400 transition-colors disabled:opacity-30" 
				disabled={isFirst}
				onclick={onPrev}
				aria-label="Sebelumnya"
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
			</button>

			<button 
				class="w-16 h-16 rounded-full bg-brand text-white flex items-center justify-center shadow-lg shadow-brand/30 hover:scale-105 active:scale-95 transition-all"
				onclick={togglePlay}
				aria-label={paused ? 'Putar' : 'Jeda'}
			>
				{#if paused}
					<!-- Play Icon -->
					<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-1"><polygon points="6 3 20 12 6 21 6 3"/></svg>
				{:else}
					<!-- Pause Icon -->
					<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
				{/if}
			</button>

			<button 
				class="p-2 text-gray-400 hover:text-brand dark:hover:text-emerald-400 transition-colors disabled:opacity-30" 
				disabled={isLast}
				onclick={onNext}
				aria-label="Berikutnya"
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
			</button>
		</div>
	</div>
</div>
