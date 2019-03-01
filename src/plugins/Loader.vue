<template>
	<div>
		<div class='loadingarea  d-flex justify-content-center' v-if='isShow'>	
			<div class='spinner align-self-center'>		
				<div class="spinner-grow text-primary" role="status">
					<span class="sr-only">Loading...</span>
				</div>
				<div class="spinner-grow text-secondary" role="status">
					<span class="sr-only">Loading...</span>
				</div>
				<div class="spinner-grow text-success" role="status">
					<span class="sr-only">Loading...</span>
				</div>
				<div class="spinner-grow text-danger" role="status">
					<span class="sr-only">Loading...</span>
				</div>
				<div class="spinner-grow text-warning" role="status">
					<span class="sr-only">Loading...</span>
				</div>
				<div class="spinner-grow text-info" role="status">
					<span class="sr-only">Loading...</span>
				</div>
				<div class="spinner-grow text-light" role="status">
					<span class="sr-only">Loading...</span>
				</div>
				<div class="spinner-grow text-dark" role="status">
					<span class="sr-only">Loading...</span>
				</div>

			</div>		
		</div>
	</div>
</template>

<script>
	export default {
		name : 'loader',
		props : {
			isShow : { type : Boolean, required : false}
		},
		methods : {
			show() {
				alert('show')
				this.isShow = true
			},
			hide() {
				alert('hide')
				this.isShow = false
			}
		}, 
	}
</script>

<style type="text/css" media="screen">
.loadingarea {
    position: fixed;
    top: 0; right: 0;
    bottom: 0; left: 0;
    width:100%; height:100%;
    background: rgba(255,255,255,0.5)
}

.spinner {
}
</style>