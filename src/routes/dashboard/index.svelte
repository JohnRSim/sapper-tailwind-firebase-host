<script>
import { goto, stores } from '@sapper/app';
import { onMount } from 'svelte';

const { session } = stores();

console.log(session);

let auth;
let user;
let logout;

//on mount 
onMount(async () => {
	//SSR import fb
	const fb = await import('../../firebase');

	//setup auth
	auth = fb.auth;
	console.log($session.user);

	//
	logout = () => {
		console.log('logout');
		auth.signOut();
		goto('/');
	};
});



</script>

<svelte:head>
	<title>tip.it - Your one stop crypto asset tipping solution.</title>
</svelte:head>

<div>
	<button on:click="{() => {logout()}}">
		Log out
	</button>
</div>

<style>
</style>