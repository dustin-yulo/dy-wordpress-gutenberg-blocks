<?php
/**
 * Plugin Name:       DY - Wordpress Gutenberg Blocks
 * Description:       Custom Gutenberg blocks. Simple, lightweight, and free!
 * Requires at least: 5.9
 * Requires PHP:      7.4
 * Version:           1.0.0
 * Author:            Dustin Yulo
 * Author URI:		  https://dustinyulo.dev/
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       dy-wordpress-gutenberg-blocks
 *
 * @package           dy-wordpress-gutenberg-blocks
 */


// Register a custom blocks menu and add it to the top of the list
function dy_wordpress_gutenberg_blocks_add_block_categories( $categories ) {

	$category_slugs = wp_list_pluck( $categories, 'slug' );
 	
	if( ! in_array( 'dy-wordpress-gutenberg-blocks', $category_slugs, true ) ) {
		array_unshift(
			$categories,
			[
				'title' => __( 'DY - WordPress Gutenberg Blocks', 'dy-wordpress-gutenberg-blocks' ),
				'slug'  => 'dy-wordpress-gutenberg-blocks',
			],
		);
	}

	return $categories;
}
add_action( 'block_categories_all', 'dy_wordpress_gutenberg_blocks_add_block_categories' );

// Enqueue required scripts
function dy_wordpress_gutenberg_blocks_scripts() {
    wp_enqueue_script(
        'swiper-custom-element',
        'https://cdn.jsdelivr.net/npm/swiper@9/swiper-element-bundle.min.js',
        [],
        '9.4.1'
    );
}
add_action( 'wp_enqueue_scripts', 'dy_wordpress_gutenberg_blocks_scripts' );
add_action( 'enqueue_block_editor_assets', 'dy_wordpress_gutenberg_blocks_scripts' );

// Require the custom block's callbacks if necessary
require_once( 'includes/post-carousel/post-carousel-block.php' );

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 */
function dy_wordpress_gutenberg_blocks_init() {
	register_block_type( __DIR__ . '/build/blocks/button-with-icon' );
	register_block_type( __DIR__ . '/build/blocks/post-carousel', [ 'render_callback' => 'dy_post_carousel_block' ] );
}
add_action( 'init', 'dy_wordpress_gutenberg_blocks_init' );