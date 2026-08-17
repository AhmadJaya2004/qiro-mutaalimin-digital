export type QiroItemType = 'taawwudz' | 'basmalah' | 'verse';

export interface QiroItem {
	id: string;
	type: QiroItemType;
	title: string;
	verseNumber?: number;
	arabic: string;
	audio: string;
}

export const qiroItems: QiroItem[] = [
	{
		id: 'taawwudz',
		type: 'taawwudz',
		title: "Ta'awwudz",
		arabic: 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ',
		audio: '/audio/taawwudz.mp3'
	},
	{
		id: 'basmalah',
		type: 'basmalah',
		title: 'Basmalah',
		arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
		audio: '/audio/basmalah.mp3'
	},
	{
		id: 'anfal-1',
		type: 'verse',
		title: 'Surat Al-Anfal',
		verseNumber: 1,
		arabic: 'يَسْأَلُونَكَ عَنِ الْأَنفَالِ ۖ قُلِ الْأَنفَالُ لِلَّهِ وَالرَّسُولِ ۖ فَاتَّقُوا اللَّهَ وَأَصْلِحُوا ذَاتَ بَيْنِكُمْ ۖ وَأَطِيعُوا اللَّهَ وَرَسُولَهُ إِن كُنتُم مُّؤْمِنِينَ',
		audio: '/audio/al-anfal/01.mp3'
	},
	{
		id: 'anfal-2',
		type: 'verse',
		title: 'Surat Al-Anfal',
		verseNumber: 2,
		arabic: 'إِنَّمَا الْمُؤْمِنُونَ الَّذِينَ إِذَا ذُكِرَ اللَّهُ وَجِلَتْ قُلُوبُهُمْ وَإِذَا تُلِيَتْ عَلَيْهِمْ آيَاتُهُ زَادَتْهُمْ إِيمَانًا وَعَلَىٰ رَبِّهِمْ يَتَوَكَّلُونَ',
		audio: '/audio/al-anfal/02.mp3'
	},
	{
		id: 'anfal-3',
		type: 'verse',
		title: 'Surat Al-Anfal',
		verseNumber: 3,
		arabic: 'الَّذِينَ يُقِيمُونَ الصَّلَاةَ وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ',
		audio: '/audio/al-anfal/03.mp3'
	},
	{
		id: 'anfal-4',
		type: 'verse',
		title: 'Surat Al-Anfal',
		verseNumber: 4,
		arabic: 'أُولَٰئِكَ هُمُ الْمُؤْمِنُونَ حَقًّا ۚ لَّهُمْ دَرَجَاتٌ عِندَ رَبِّهِمْ وَمَغْفِرَةٌ وَرِزْقٌ كَرِيمٌ',
		audio: '/audio/al-anfal/04.mp3'
	},
	{
		id: 'anfal-5',
		type: 'verse',
		title: 'Surat Al-Anfal',
		verseNumber: 5,
		arabic: 'كَمَا أَخْرَجَكَ رَبُّكَ مِن بَيْتِكَ بِالْحَقِّ وَإِنَّ فَرِيقًا مِّنَ الْمُؤْمِنِينَ لَكَارِهُونَ',
		audio: '/audio/al-anfal/05.mp3'
	}
];
