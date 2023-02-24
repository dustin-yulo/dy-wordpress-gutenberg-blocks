<?php
/**
 * Plugin Name:       DY - Wordpress Gutenberg Blocks
 * Description:       Custom WordPress Gutenberg blocks that you just might need. Simple, lightweight, free!
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           1.0.0
 * Author:            Dustin Yulo
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

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 */
function dy_wordpress_gutenberg_blocks_init() {
	register_block_type( __DIR__ . '/build/font-awesome-button-with-icon' );
}
add_action( 'init', 'dy_wordpress_gutenberg_blocks_init' );