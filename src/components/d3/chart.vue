<template>
	<div class='d3 chart'>
		
	</div>
</template>

<script type="text/javascript">
	export default {
		props : {
			id : { type : String, required : true},
			title : { type : String}, 
			width : { type : Number, required : true },
			height: { type : Number, required : true },
			conf : { type : Object },
			xConf : { type : Object },
			yConf : { type : Object }
		}
	}
</script>
<style type="text/css">
	
</style>