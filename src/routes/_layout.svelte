<script>
	//widgets
	import Header from '../components/Header.svelte';
	import Wrapper from '../components/Wrapper.svelte';
	import Footer from '../components/Footer.svelte';
</script>

<!-- App Layout -->
<!-- Header -->
<Header />
<!-- xHeader -->

<!-- Content -->
<Wrapper>
	<main>
		<slot></slot>
	</main>
</Wrapper>
<!-- xContent -->

<!-- Footer -->
<Footer />
<!-- xFooter -->
<!-- xApp Layout -->



<style>
</style>