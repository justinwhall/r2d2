<!DOCTYPE html>
<html <?php language_attributes(); ?>>
	<head>
		<meta charset="<?php bloginfo( 'charset' ); ?>">
		<meta name="viewport" content="width=device-width,initial-scale=1">
		<link rel="shortcut icon" href="/favicon.ico">
		<title>React App</title>
		<?php wp_head(); ?>
	</head>
	<body <?php body_class(); ?>>
		<div id="root"></div>
		<?php wp_footer(); ?>
	</body>
</html>
