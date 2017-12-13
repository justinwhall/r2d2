<?php
/**
 * Update permalinks for correct JS-based routing
 *
 * @package R2D2
 */

/**
 * Class wrapper for permalink actions
 */
class R2D2_Permalinks {
	/**
	 * Set up actions
	 */
	public function __construct() {
		add_action( 'admin_notices', array( $this, 'admin_permalinks_warning' ) );
		add_action( 'init', array( $this, 'change_date' ) );
		add_action( 'init', array( $this, 'change_paged' ) );
		add_action( 'after_switch_theme', array( $this, 'update_permalinks' ), 11 );
		add_action( 'template_redirect', array( $this, 'do_redirects' ) );
		add_filter( 'attachment_link', array( $this, 'change_attachment' ), 20, 2 );

		// Flush permalinks after the theme is activated.
		add_action( 'after_switch_theme', 'flush_rewrite_rules' );
	}

	/**
	 * Add a warning message to the permalinks screen.
	 */
	public function admin_permalinks_warning() {
		$current_screen = get_current_screen();
		if ( 'options-permalink' !== $current_screen->id ) {
			return;
		}
		?>
		<div class="notice notice-warning">
			<p><?php _e( '<b>Warning:</b> The theme you\'re using does not support customized permalinks.', 'r2d2' ); ?></p>
		</div>
		<?php
	}

	/**
	 * Add a warning message to the theme screen after activation.
	 */
	public function admin_theme_warning() {
		?>
		<div class="notice notice-warning">
			<p><?php _e( 'This theme requires special URLs to display your content, so your permalinks have been updated. To undo this, switch to another theme.', 'r2d2' ); ?></p>
		</div>
		<?php
	}

	/**
	 * Set the permalink structure to year/month/postname
	 */
	public function update_permalinks() {
		global $wp_rewrite;
		$wp_rewrite->set_permalink_structure( '/%year%/%monthnum%/%postname%/' );
		add_action( 'admin_notices', array( $this, 'admin_theme_warning' ) );
	}

	/**
	 * Add `date` prefix to date permalink structure
	 */
	public function change_date() {
		global $wp_rewrite;
		$wp_rewrite->date_structure = '/date/%year%/%monthnum%/%day%';
	}

	/**
	 * Add `p` prefix to paginated permalink structure
	 */
	public function change_paged() {
		global $wp_rewrite;
		$wp_rewrite->pagination_base = 'p';
	}


	public function change_attachment( $link, $post_id ){
		$post = get_post( $post_id );
		return home_url( '/attachment/' . $post->post_title . '/' . $post_id );
	}

	/**
	 * Create an `attachment/ID` rule so that our custom route isn't automatically 404'd
	 */
	// public function add_new_attachment() {
	// 	// It doesn't actually matter where the rule goes.
	// 	add_rewrite_rule( '^attachment/([0-9]+)/?', 'index.php', 'top' );
	// }

	/**
	 * Redirect the search form results `?s=<term>` to `/search/<term>`
	 */
	public function do_redirects() {

		$search = get_search_query();
		global $wp;

		if ( $search && ( 'search' !== substr( $wp->request, 0, 6 ) ) ) {
			// Decode the quotes before re-encoding in the redirect
			$search = html_entity_decode( $search, ENT_QUOTES );
			$url = home_url( sprintf( '/search/%s', urlencode( $search ) ) );
			wp_safe_redirect( $url );
			exit();
		}
	}
}
new R2D2_Permalinks();