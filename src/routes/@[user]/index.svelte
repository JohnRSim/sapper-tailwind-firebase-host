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
USER
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