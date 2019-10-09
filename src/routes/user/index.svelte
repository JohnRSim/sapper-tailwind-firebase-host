<script context="module">

	export function preload({ params }, { user }) {
		console.log('user', user);
		if (user) {
			this.redirect(302, `/@${user.username}`);
		} else {
			this.redirect(302, `/`);
		}
	}
</script>
