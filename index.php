<!DOCTYPE html>
<html <?php language_attributes(); ?>>
	<head>
		<meta charset="<?php bloginfo( 'charset' ); ?>">
		<meta name="viewport" content="width=device-width,initial-scale=1">
		<link rel="shortcut icon" href="/favicon.ico">
		<title><?php bloginfo('name')?></title>
		<?php wp_head(); ?>
	</head>
	<body <?php body_class(); ?>>

		<div id="site-wrapper" class="isLoading">

			<div id="root"></div>

			<?php wp_footer(); ?>

		</div>

		<img id="r2d2" src="<?php echo get_template_directory_uri(); ?>/img/r2d2.png" />
		<!-- :) -->
	</body>
</html>
