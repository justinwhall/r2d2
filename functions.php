<?php
/**
 * R2D2 functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package R2D2
 */

/**
 * R2D2 only works if the REST API is available
 */
if ( version_compare( $GLOBALS['wp_version'], '4.7', '<' ) ) {
	require get_template_directory() . '/inc/compat-warnings.php';
	return;
}

if ( ! defined( 'R2D2_VERSION' ) ) {
	define( 'R2D2_VERSION', '0.9.0' );
}

if ( ! defined( 'R2D2_APP' ) ) {
	define( 'R2D2_APP', 'r2d2-react' );
}

include_once 'class-r2d2-rest.php';
include_once 'class-r2d2-permalinks.php';
include_once 'class-r2d2-first-load.php';

add_filter( 'rest_allow_anonymous_comments', '__return_true' );

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
 * Register our sidebars and widgetized areas.
 *
 */
function r2d2_widgets_init() {

	register_sidebar( array(
		'name'          => 'Footer',
		'id'            => 'r2d2_footer',
		'before_widget' => '<div>',
		'after_widget'  => '</div>',
		'after_title'   => '</h2>',
	) );

}
add_action( 'widgets_init', 'r2d2_widgets_init' );

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
	$script_ver = file_exists( get_stylesheet_directory() . '/dist/bundle.js' ) ? filemtime( get_stylesheet_directory() . '/dist/bundle.js' ) : R2D2_VERSION;
	$style_ver = file_exists( get_stylesheet_directory() . '/dist/style.css' ) ? filemtime( get_stylesheet_directory() . '/dist/style.css' ) : R2D2_VERSION;
	wp_enqueue_script( 'r2d2-react', get_template_directory_uri() . '/dist/bundle.js', array(), $script_ver, true );
	wp_enqueue_style( 'style-name', get_template_directory_uri() . '/dist/style.css', array(), $style_ver );
}
add_action( 'wp_enqueue_scripts', 'react_scores_scripts' );


function get_menu() {

	$locations = get_nav_menu_locations();
	$menu_obj = wp_get_nav_menu_object( $locations['menu-1'] );
	$menu = wp_get_nav_menu_items( $menu_obj->term_id );

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

function r2d2_inline_settings() {

	$url = home_url();
	$path = trailingslashit( wp_parse_url( $url )['path'] );

	$front_page_slug = false;
	$blog_page_slug = false;
	$home_is_blog = false;

	if ( 'posts' !== get_option( 'show_on_front' ) ) {
		$front_page_id = get_option( 'page_on_front' );

		if ( $front_page_id ) {
			$front_page = get_post( $front_page_id );
			if ( $front_page ) {
				$front_page_slug = $front_page->post_name;
			}
		}

		$blog_page_id = get_option( 'page_for_posts' );

		if ( $blog_page_id ) {
			$blog_page = get_post( $blog_page_id );
			if ( $blog_page ) {
				$blog_page_slug = $blog_page->post_name;
			}
		}
	}

	$user_id = get_current_user_id();
	$user = get_userdata( $user_id );

	// These are not suppose to be the same, but someone will do it...
	if ( ! $front_page_slug || $front_page_slug === $blog_page_slug ) {
		$home_is_blog = true;
	}


	$r2d2_settings = sprintf(
		'var siteSettings = %s; var r2d2Settings = %s;',
		wp_json_encode( array(
			'endpoint' => esc_url_raw( $url ),
			'nonce' => wp_create_nonce( 'wp_rest' ),
		) ),
		wp_json_encode( array(
			'user' => get_current_user_id(),
			'userDisplay' => $user ? $user->display_name : '',
			'frontPage' => $front_page_slug,
			'blog' => $blog_page_slug,
			'homeIsBlog' => $home_is_blog,
			'postsPerPage' => get_option( 'posts_per_page' ),
			'nonce' => wp_create_nonce( 'wp_rest' ),
			'URL' => array(
				'base' => esc_url_raw( $url ),
				'path' => $path
			),
			'meta' => array(
				'title' => get_bloginfo( 'name', 'display' ),
				'description' => get_bloginfo( 'description', 'display' ),
			),
		) )
	);
	wp_add_inline_script( R2D2_APP, $r2d2_settings, 'before' );
}
add_action( 'wp_enqueue_scripts', 'r2d2_inline_settings' );
