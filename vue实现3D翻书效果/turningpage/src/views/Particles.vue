<template>
	<div id="particles">

	</div>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		    mounted() {
		        particlesJS.load('particles',"../../particles.json", function () {
		            console.log('callback - particles.js config loaded');
		        });
		       
		    }
	}
</script>

<style scoped>
#particles {
    position: relative;
    width: 100%;
	height: 100%;
    background-color: #0f0f1a;
    background-repeat: no-repeat;
    background-size: cover;
	min-height: 768px;
}
</style>
<style>
.particles-js-canvas-el {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}
</style>