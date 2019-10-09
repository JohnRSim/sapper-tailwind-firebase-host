<script>
	//widgets
	import Wrapper from '../components/Wrapper.svelte';
	import Widget from '../components/Widget.svelte';
	import Banner from '../components/Banner.svelte';
</script>


<Wrapper>
	<!-- svelte doesn't allow applying of classes to components yet.. -->
	<!-- may hotfx with att later.. -->
	<div class="relative">
		<Widget>
			<!-- Banner-->
			<Banner/>
			<!-- xBanner-->

			<!-- Quick Tip Actions-->
			<div id="TIP-userActions">
				<button>SEND TIP</button>
				<button>RECEIVE TIP</button>
			</div>
			<!-- xQuick Tip Actions-->
		</Widget>
	</div>
</Wrapper>




<style>
button {
	background:#3ABC8D;
	color:#fff;
	font-size: 0.8em;
	border-radius:40px;
	padding:2px 12px;
}
#TIP-userActions {
	position:absolute;
	bottom:10px;
	right:10px;
}
</style>
