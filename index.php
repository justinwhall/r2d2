<!DOCTYPE html>
<html <?php language_attributes(); ?>>
	<head>
		<meta charset="<?php bloginfo( 'charset' ); ?>">
		<meta name="viewport" content="width=device-width,initial-scale=1">
		<link rel="shortcut icon" href="/favicon.ico">
		<title><?php bloginfo('name')?></title>
		<?php wp_head(); ?>

		<style>
		.loader {
			margin-top: 50px;
			border: 7px solid #f3f3f3; /* Light grey */
			border-top: 7px solid #3498db; /* Blue */
			border-radius: 50%;
			width: 20px;
			height: 20px;
			animation: spin 2s linear infinite;
		}

		@keyframes spin {
			0% { transform: rotate(0deg); }
			100% { transform: rotate(360deg); }
		}
		</style>
	</head>
	<body <?php body_class(); ?>>
		<div id="root"></div>
		<?php wp_footer(); ?>
	</body>
</html>
