
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/movies";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/": Record<string, never>;
			"/movies": Record<string, never>
		};
		Pathname(): "/" | "/movies" | "/movies/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/.DS_Store" | "/images/.DS_Store" | "/images/avengers.png" | "/images/casablanca.png" | "/images/coco.png" | "/images/fcz-background.jpg" | "/images/fcz-box-background.jpg" | "/images/how_to_train_your_dragon.png" | "/images/la_confidential.png" | "/images/parasite.png" | "/images/schindlers_list.png" | "/images/seven_samurai.png" | "/images/stadtclub_background.jpg" | "/images/the_force_awakens.png" | "/images/top_gun_maverick.png" | "/images/toy_story_2.png" | "/images/toy_story_4.png" | "/images/up.png" | "/images/wall-e.png" | "/images/zootopia.png" | string & {};
	}
}