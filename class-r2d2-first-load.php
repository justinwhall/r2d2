<?php

class FirstLoad {

	public function __construct() {
		add_action( 'wp_enqueue_scripts', [ $this, 'dump_query' ], 25 );
	}

	/**
	 * Dumps the global posts as JSON for first load render
	 */
	public function dump_query() {
		wp_localize_script( 'r2d2-react', 'first_load_data', [ 'data' => $this->get_post_data() ] );
	}

	/**
	 * Gets global posts data from the JSON API server
	 *
	 * @param null $posts
	 *
	 * @return array
	 */
	public function get_post_data( $posts = null ) {

		$found_posts = false;
		if ( $posts === null && ! is_404() ) {
			$posts = $GLOBALS['wp_query']->posts;
			$found_posts = $GLOBALS['wp_query']->found_posts;
		}

		global $wp_rest_server;
		if ( empty( $wp_rest_server ) ) {
			$wp_rest_server_class = apply_filters( 'wp_rest_server_class', 'WP_REST_Server' );
			$wp_rest_server       = new $wp_rest_server_class;
			do_action( 'rest_api_init' );
		}

		$data               = array();
		$request            = new WP_REST_Request();
		$request['context'] = 'view';

		foreach ( (array) $posts as $post ) {
			$controller = new WP_REST_Posts_Controller( $post->post_type );
			$data['posts'][]     = $wp_rest_server->response_to_data( $controller->prepare_item_for_response( $post, $request ), true );
		}

		if ( $found_posts ) {
			$data['found_posts'] = $found_posts;
		}

		return $data;
	}
}

new FirstLoad;