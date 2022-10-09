<script lang='ts'>
import RibbonDrawer from '$lib/RibbonDrawer.svelte';
import ThemeButton from '$lib/ThemeButton.svelte';
import { MenuOption } from '../classes/MenuOption';
import RibbonButton from '$lib/RibbonButton.svelte';
import { Theme } from '../classes/Theme';
import Separator from '$lib/Separator.svelte';
import { createEventDispatcher } from 'svelte';
import { SelectionDirection, SelectionPart } from '../classes/Selection.js';

let menuSelected: MenuOption = MenuOption.Home;
export let theme: Theme;
const dispatch = createEventDispatcher();
</script>

<div class='bg-gray-200 border-b-[1px] border-gray-400 p-2 select-none'>
	<div class='space-x-4'>
		<button on:click={() => menuSelected = MenuOption.Home}
						class='hover:font-bold {menuSelected === MenuOption.Home && "border-b-4 border-blue-500 font-bold"}'>Accueil
		</button>
		<button on:click={() => menuSelected = MenuOption.Selection}
						class='hover:font-bold {menuSelected === MenuOption.Selection && "border-b-4 border-blue-500 font-bold"}'>
			Sélection
		</button>
		<button on:click={() => menuSelected = MenuOption.Theme}
						class='hover:font-bold {menuSelected === MenuOption.Theme && "border-b-4 border-blue-500 font-bold"}'>
			Theme
		</button>
		<button on:click={() => menuSelected = MenuOption.About}
						class='hover:font-bold {menuSelected === MenuOption.About && "border-b-4 border-blue-500 font-bold"}'>
			À propos
		</button>
	</div>

	{#if menuSelected === MenuOption.Home}
		<RibbonDrawer>
			<RibbonButton on:click={() => dispatch("copy")} title='Copy'>
				<svg viewBox='0 0 24 24' class='fill-amber-600 h-10'>
					<path
						d='M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z' />
				</svg>
			</RibbonButton>

			<RibbonButton title='Paste' on:click={() => dispatch("paste")}>
				<svg viewBox='0 0 24 24' class='h-10 fill-gray-500'>
					<path
						d='M19,20H5V4H7V7H17V4H19M12,2A1,1 0 0,1 13,3A1,1 0 0,1 12,4A1,1 0 0,1 11,3A1,1 0 0,1 12,2M19,2H14.82C14.4,0.84 13.3,0 12,0C10.7,0 9.6,0.84 9.18,2H5A2,2 0 0,0 3,4V20A2,2 0 0,0 5,22H19A2,2 0 0,0 21,20V4A2,2 0 0,0 19,2Z' />
				</svg>
			</RibbonButton>

			<RibbonButton title='Cut' on:click={() => dispatch("cut")}>
				<svg viewBox='0 0 24 24' class='h-10 fill-gray-500'>
					<path
						d='M19,3L13,9L15,11L22,4V3M12,12.5A0.5,0.5 0 0,1 11.5,12A0.5,0.5 0 0,1 12,11.5A0.5,0.5 0 0,1 12.5,12A0.5,0.5 0 0,1 12,12.5M6,20A2,2 0 0,1 4,18C4,16.89 4.9,16 6,16A2,2 0 0,1 8,18C8,19.11 7.1,20 6,20M6,8A2,2 0 0,1 4,6C4,4.89 4.9,4 6,4A2,2 0 0,1 8,6C8,7.11 7.1,8 6,8M9.64,7.64C9.87,7.14 10,6.59 10,6A4,4 0 0,0 6,2A4,4 0 0,0 2,6A4,4 0 0,0 6,10C6.59,10 7.14,9.87 7.64,9.64L10,12L7.64,14.36C7.14,14.13 6.59,14 6,14A4,4 0 0,0 2,18A4,4 0 0,0 6,22A4,4 0 0,0 10,18C10,17.41 9.87,16.86 9.64,16.36L12,14L19,21H22V20L9.64,7.64Z' />
				</svg>
			</RibbonButton>
		</RibbonDrawer>


	{:else if menuSelected === MenuOption.Selection}
		<RibbonDrawer>
			<div class='flex flex-col items-center'>
				<div>
					<button
						on:click={() => dispatch("selection", {from: SelectionPart.Begin, direction: SelectionDirection.Expand})}
						class='hover:bg-black/10 p-1'>
						<svg class='h-10' viewBox='0 0 24 24'>
							<path d='M18.41,16.59L13.82,12L18.41,7.41L17,6L11,12L17,18L18.41,16.59M6,6H8V18H6V6Z' />
						</svg>
					</button>
					<button class='hover:bg-black/10 p-1'
									on:click={() => dispatch("selection", {from: SelectionPart.Begin, direction: SelectionDirection.Shrink})}>
						<svg class='h-10' viewBox='0 0 24 24'>
							<path fill='currentColor' d='M5.59,7.41L10.18,12L5.59,16.59L7,18L13,12L7,6L5.59,7.41M16,6H18V18H16V6Z' />
						</svg>
					</button>
				</div>
				<div>Début de la sélection</div>
			</div>

			<Separator></Separator>

			<div class='flex flex-col items-center'>
				<div>
					<button class='hover:bg-black/10 p-1'
									on:click={() => dispatch("selection", {from: SelectionPart.End, direction: SelectionDirection.Shrink})}>
						<svg class='h-10' viewBox='0 0 24 24'>
							<path d='M18.41,16.59L13.82,12L18.41,7.41L17,6L11,12L17,18L18.41,16.59M6,6H8V18H6V6Z' />
						</svg>
					</button>
					<button class='hover:bg-black/10 p-1'
									on:click={() => dispatch("selection", {from: SelectionPart.End, direction: SelectionDirection.Expand})}>
						<svg class='h-10' viewBox='0 0 24 24'>
							<path fill='currentColor' d='M5.59,7.41L10.18,12L5.59,16.59L7,18L13,12L7,6L5.59,7.41M16,6H18V18H16V6Z' />
						</svg>
					</button>
				</div>
				<div>Fin de la sélection</div>
			</div>
		</RibbonDrawer>

	{:else if menuSelected === MenuOption.Theme}
		<RibbonDrawer>
			<div class='bg-white border-[1px] border-black/50 space-x-4 rounded-lg'>
				<ThemeButton on:click={() => theme = Theme.Standard} active={theme === Theme.Standard} emoji='😁'>
					Standard
				</ThemeButton>
				<ThemeButton on:click={() => theme = Theme.Kitten} active={theme === Theme.Kitten} emoji='🐱'>
					Chaton
				</ThemeButton>
				<ThemeButton on:click={() => theme = Theme.Capybara} active={theme === Theme.Capybara} emoji='🦫'>
					Capybara
				</ThemeButton>
				<ThemeButton on:click={() => theme = Theme.Unicorn} active={theme === Theme.Unicorn} emoji='🦄'>
					Licorne
				</ThemeButton>
			</div>
		</RibbonDrawer>
	{:else if menuSelected === MenuOption.About}
		<RibbonDrawer>
			<div class='h-full flex justify-center flex-col'>
				<div>Projet réalisé par Mael KERICHARD et Romain BRIEND</div>
				<div>Images des thèmes chaton et capybara: <a class='text-blue-500' target='_blank' href='https://unsplash.com'>Unsplash</a>
				</div>
				<div>Image du thème licorne: <a class='text-blue-500' target='_blank'
																				href='https://www.linkedin.com/in/chloe-becker-fr/'>Chloe Becker</a></div>

			</div>
		</RibbonDrawer>
	{/if}

</div>
