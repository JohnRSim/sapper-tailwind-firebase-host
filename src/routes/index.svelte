<script>
//app
import { goto, stores } from '@sapper/app';
import { onMount, onDestroy } from 'svelte';

//global Store
import sUser from '../stores/user.js';
import sSocial from '../stores/social.js';

//widgets
import Widget from '../components/Widget.svelte';

//internal session store
const { session } = stores();

//define vars
let user;
let login;
let signOut;
let auth;
let activeAuthState;

console.info('[Active Session]', $session);

//on mount 
onMount(async () => {
	console.info('[Mounted][Home]');

	//SSR import fb
	const fb = await import('../firebase');
	const fAuth = await import('rxfire/auth');

	//
	const authState = fAuth.authState;

	//setup auth
	auth = fb.auth;

	//
	activeAuthState = authState(auth).subscribe((u) => {
		console.info('[Setting user]', u);
		//session.set({ user: u });

		//user logged in
		if (u !== null) {
			console.info('[Update User]', u.displayName);
			session.set({ user: { username: 'test' } });
			sUser.update((state) => {
				//update active user
				const updatedState = {
					...state, 
					displayName: u.displayName, 
					profileImg: u.photoURL,
					_rehydrated: true
				};
				return updatedState;
			});
		} else {
			console.info('[Clear User]');
			session.set({ user: false });
			sUser.update((state) => {
				//clear active user
				const updatedState = {
					...state, 
					displayName: '', 
					profileImg: '',
					_rehydrated: true
				};
				return updatedState;
			});
		}
	});

	//
	login = (provider) => {
		console.info(`[Login][${provider}]`);
		
		//select provider
		let activeProvider = null;
		switch(provider) {
			case 'google':
				activeProvider = fb.googleProvider;
			break;
			case 'facebook':
				activeProvider = fb.facebookProvider;
			break;
			case 'twitter':
				activeProvider = fb.twitterProvider;
			break;
			case 'github':
				activeProvider = fb.githubProvider;
			break;
			default :
				alert('err');
				return;
			break;
		}

		//login with provider
		auth.signInWithPopup(activeProvider).then((result) => {
			console.info('[activeProvider]', result);
			
			//update active login provider
			sSocial.update((state) => {
				//update active user
				const updatedState = {
					...state, 
					activeLogin: provider, 
					_rehydrated: true
				};
				return updatedState;
			});

			// This gives you a the Twitter OAuth 1.0 Access Token and Secret.
			// You can use these server side with your app's credentials to access the Twitter API.
			const token = result.credential.accessToken;
			const secret = result.credential.secret;
			// The signed-in user info.
			//const user = result.user;
			goto('/dashboard');
		// ...
		}).catch((error) => {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			// The email of the user's account used.
			const email = error.email;
			// The firebase.auth.AuthCredential type that was used.
			const credential = error.credential;
			// ...
		});
	}

	//
	signOut = () => {
		auth.signOut();
	}
});

//on destroy 
onDestroy(async () => {
	console.info('[Destroyed][Home]');

	//unsubscribe if subscribed.
	if (activeAuthState) {
		activeAuthState.unsubscribe();
	}
});
</script>






<svelte:head>
	<title>tip.it - Your one stop crypto asset tipping solution.</title>
</svelte:head>






<Widget>
	{#if $session.user}
		<div class="m-10">
			<h4 class="font-semibold mb-4">
				Hey {$sUser.displayName}<br />
				<span>Welcome back to tip.it!</span>
			</h4>

			<button on:click="{() => {goto('/user');}}">dashboard</button>
			<button on:click="{ () => {signOut()} }">
				Log out
			</button>
		</div>
	{:else}
	
		<div class="m-10">
			<h4 class="font-semibold mb-4">Welcome to tip.it</h4>
			<p class="mb-4">
				Your community crypto tipping platform! 
				From here you can send and receive crypto donations and tips to websites as well as social walls.
			</p>
			<p>
				<b>Signup free</b> with your social account <br />
				<i>- no crypto experience needed!</i>
			</p>
		</div>

		<fieldset>
			<legend>Login</legend>
			<button on:click="{() => {login('twitter');}}">Twitter</button>
			<button on:click="{() => {login('google');}}">Google</button>
			<button on:click="{() => {login('facebook');}}">Facebook</button>
			<button on:click="{() => {login('github');}}">Github</button>
		</fieldset>
	{/if}
	<div class="hr"><hr /></div>

	<div id="TIP-moreinfo">
		<button>LIVE DEMOS</button>
		<button>TELL ME MORE</button>
	</div>
</Widget>






<style>
fieldset {
	border:solid 1px #E2E2E2;
	border-radius: 200px;
	text-align: center;
	margin:0px 20px;
}
fieldset legend {
	padding:0px 10px;
}

.hr {
	height:1px; 
	background:#E2E2E2;
	margin:20px 0px;
}

#TIP-moreinfo {
	display:flex;
	justify-content:center;
	margin-bottom:20px;
}

#TIP-moreinfo button{
	background:#0C7ACC;
	color:#fff;
	font-size: 0.8em;
	border-radius:40px;
	padding:2px 12px;
	margin:0px 4px;
	min-width:120px;
	font-weight:500;
}
</style>