<script context="module">
	// the (optional) preload function takes a
	// `{ path, params, query }` object and turns it into
	// the data we need to render the page
	export async function preload(page, session) {
		// the `slug` parameter is available because this file
		// is called [slug].svelte\
		const { social } = page.params;
		const supportedNetworks = ['twitter','google','facebook','github'];
		//console.log('????',sSocial.supportedNetworks.indexOf(social));
		if (supportedNetworks.indexOf(social.toLowerCase()) === -1) {
			return this.redirect(302, '/');
		}
	}
</script>

<script>
//app
import { goto, stores } from '@sapper/app';
import { onMount, onDestroy } from 'svelte';

//widgets
import Widget from '../../components/Widget.svelte';

//internal session store
const { session } = stores();

//define vars
let auth;
let user;
let logout;
let home;

console.info('[Active Session]', $session);

//on mount 
onMount(async () => {
	console.info('[Mounted][Dashboard]');
	//SSR import fb
	const fb = await import('../../firebase');

	//setup auth
	auth = fb.auth;

	//
	logout = () => {
		console.log('logout');
		auth.signOut();
		goto('/');
	};
	home = () => {
		console.log('Dashboard');
		goto('/');
	};
});



</script>

<svelte:head>
	<title>tip.it - Your one stop crypto asset tipping solution.</title>
</svelte:head>

<Widget>
Social
	<button on:click="{() => {logout()}}">
		Log out
	</button>
	<button on:click="{() => {home()}}">
		Home
	</button>
</Widget>

<Widget>

</Widget>

<style>
</style>