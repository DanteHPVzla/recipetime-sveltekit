<nav>
	<a href="/" class="logoContainer">
		<img src="./img/logo_1.png" alt="RecipeTime Logo" />
		<span>RecipeTime</span>
	</a>
</nav>
<div id="nav-container">
	<div class="button" tabindex="0">
		<span class="icon-bar" />
		<span class="icon-bar" />
		<span class="icon-bar" />
	</div>
	<div id="nav-content" tabindex="0">
		<ul>
			<li><a href="/">Inicio</a></li>
			<li><a href="/login">Iniciar Sesion</a></li>
			<li><a href="/register">Registrarse</a></li>
		</ul>
	</div>
</div>




<style lang="scss">
	nav {
		background: #f05a28;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		height: 65px;
		position: sticky;
		top: 0;
		z-index: 5;
		.logoContainer {
			display: flex;
			justify-content: center;
			align-items: center;
			position: absolute;
			left: 15px;
			text-decoration: none;
			img {
				width: 50px;
				margin-right: 8px;
			}
			span {
				color: white;
				font-family: 'Bad Script', cursive;
				font-size: 1.5em;
			}
		}
	}

	#nav-container {
		position: fixed;
		height: 100vh;
		width: 100%;
		pointer-events: none;
		z-index: 20;
		&:focus-within {
			.button {
				pointer-events: none;
			}
			.icon-bar:nth-of-type(1) {
				transform: translate3d(0, 8px, 0) rotate(45deg);
			}
			.icon-bar:nth-of-type(2) {
				opacity: 0;
			}
			.icon-bar:nth-of-type(3) {
				transform: translate3d(0, -8px, 0) rotate(-45deg);
			}
			#nav-content {
				transform: none;
			}
		}
	}

	.button {
		position: absolute;
		top: -65px;
		right: 20px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		z-index: 1;
		-webkit-appearance: none;
		border: 0;
		background: transparent;
		border-radius: 0;
		height: 65px;
		width: 30px;
		cursor: pointer;
		pointer-events: auto;
		touch-action: manipulation;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		.icon-bar {
			display: block;
			width: 100%;
			height: 3px;
			background: white;
			transition: 0.3s;
		}
		.icon-bar + .icon-bar {
			margin-top: 5px;
		}
	}

	#nav-content {
		width: 90%;
		max-width: 300px;
		position: absolute;
		top: 0;
		right: 0;
		height: 100%;
		background: #f05a28;
		pointer-events: auto;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		transform: translateX(100%);
		transition: transform 0.3s;
		will-change: transform;
		contain: paint;
		z-index: 30;

		ul {
			height: 100%;
			display: flex;
			flex-direction: column;
		}
		li {
			padding: 10px 20px;
			&:hover {
				background-color: white;
				transition: all 0.2s;
				a {
					color: #f05a28;
					transition: color 0.2s;
				}
			}
			a {
				padding: 10px 5px;
				display: block;
				text-transform: uppercase;
			}
		}
	}

	a,
	a:visited,
	a:focus,
	a:active,
	a:link {
		text-decoration: none;
		outline: 0;
	}

	a {
		color: white;
		transition: 0.2s ease-in-out;
	}

	ul {
		padding: 0;
		list-style: none;
	}
</style>
