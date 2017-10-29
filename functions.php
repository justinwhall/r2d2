<?php
/**
 * R2D2 functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package R2D2
 */

if ( ! function_exists( 'r2d2_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function r2d2_setup() {
		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on React Scores, use a find and replace
		 * to change 'r2d2-react' to the name of your theme in all the template files.
		 */
		load_theme_textdomain( 'r2d2-react', get_template_directory() . '/languages' );

		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );

		// This theme uses wp_nav_menu() in one location.
		register_nav_menus( array(
			'menu-1' => esc_html__( 'Primary', 'r2d2-react' ),
		) );

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support( 'html5', array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
		) );

		// Set up the WordPress core custom background feature.
		add_theme_support( 'custom-background', apply_filters( 'react_scores_custom_background_args', array(
			'default-color' => 'ffffff',
			'default-image' => '',
		) ) );

		// Add theme support for selective refresh for widgets.
		add_theme_support( 'customize-selective-refresh-widgets' );

		/**
		 * Add support for core custom logo.
		 *
		 * @link https://codex.wordpress.org/Theme_Logo
		 */
		add_theme_support( 'custom-logo', array(
			'height'      => 250,
			'width'       => 250,
			'flex-width'  => true,
			'flex-height' => true,
		) );
	}
endif;
add_action( 'after_setup_theme', 'r2d2_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function react_scores_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'react_scores_content_width', 640 );
}
add_action( 'after_setup_theme', 'react_scores_content_width', 0 );


/**
 * Enqueue scripts and styles.
 */
function react_scores_scripts() {
	wp_enqueue_script( 'r2d2-react', get_template_directory_uri() . '/dist/bundle.js', array(), '0.9', true );
}
add_action( 'wp_enqueue_scripts', 'react_scores_scripts' );


function get_menu() {

	$menu = wp_get_nav_menu_items( 'main' );

	foreach ( $menu as $item ) {
		// Just in case we have a home menu item with full url.
		if ( get_site_url() === untrailingslashit( $item->url ) ) {
			$item->uri = '/';
		} else {
			$item->uri = str_replace( get_site_url(), '', $item->url );
		}
	}

	return $menu;
}

add_action( 'rest_api_init', function () {
	register_rest_route( 'r2d2', '/menu', array(
		'methods' => 'GET',
		'callback' => 'get_menu',
	) );
} );
