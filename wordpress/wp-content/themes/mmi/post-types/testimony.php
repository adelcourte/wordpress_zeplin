<?php

/**
 * Registers the `testimony` post type.
 */
function testimony_init() {
	register_post_type( 'testimony', array(
		'labels'                => array(
			'name'                  => __( 'Testimonies', 'mmi' ),
			'singular_name'         => __( 'Testimony', 'mmi' ),
			'all_items'             => __( 'All Testimonies', 'mmi' ),
			'archives'              => __( 'Testimony Archives', 'mmi' ),
			'attributes'            => __( 'Testimony Attributes', 'mmi' ),
			'insert_into_item'      => __( 'Insert into Testimony', 'mmi' ),
			'uploaded_to_this_item' => __( 'Uploaded to this Testimony', 'mmi' ),
			'featured_image'        => _x( 'Featured Image', 'testimony', 'mmi' ),
			'set_featured_image'    => _x( 'Set featured image', 'testimony', 'mmi' ),
			'remove_featured_image' => _x( 'Remove featured image', 'testimony', 'mmi' ),
			'use_featured_image'    => _x( 'Use as featured image', 'testimony', 'mmi' ),
			'filter_items_list'     => __( 'Filter Testimonies list', 'mmi' ),
			'items_list_navigation' => __( 'Testimonies list navigation', 'mmi' ),
			'items_list'            => __( 'Testimonies list', 'mmi' ),
			'new_item'              => __( 'New Testimony', 'mmi' ),
			'add_new'               => __( 'Add New', 'mmi' ),
			'add_new_item'          => __( 'Add New Testimony', 'mmi' ),
			'edit_item'             => __( 'Edit Testimony', 'mmi' ),
			'view_item'             => __( 'View Testimony', 'mmi' ),
			'view_items'            => __( 'View Testimonies', 'mmi' ),
			'search_items'          => __( 'Search Testimonies', 'mmi' ),
			'not_found'             => __( 'No Testimonies found', 'mmi' ),
			'not_found_in_trash'    => __( 'No Testimonies found in trash', 'mmi' ),
			'parent_item_colon'     => __( 'Parent Testimony:', 'mmi' ),
			'menu_name'             => __( 'Testimonies', 'mmi' ),
		),
		'public'                => true,
		'hierarchical'          => false,
		'show_ui'               => true,
		'show_in_nav_menus'     => true,
		'supports'              => array( 'title', 'editor' ),
		'has_archive'           => true,
		'rewrite'               => true,
		'query_var'             => true,
		'menu_position'         => null,
		'menu_icon'             => 'dashicons-admin-post',
		'show_in_rest'          => true,
		'rest_base'             => 'testimony',
		'rest_controller_class' => 'WP_REST_Posts_Controller',
	) );

}
add_action( 'init', 'testimony_init' );

/**
 * Sets the post updated messages for the `testimony` post type.
 *
 * @param  array $messages Post updated messages.
 * @return array Messages for the `testimony` post type.
 */
function testimony_updated_messages( $messages ) {
	global $post;

	$permalink = get_permalink( $post );

	$messages['testimony'] = array(
		0  => '', // Unused. Messages start at index 1.
		/* translators: %s: post permalink */
		1  => sprintf( __( 'Testimony updated. <a target="_blank" href="%s">View Testimony</a>', 'mmi' ), esc_url( $permalink ) ),
		2  => __( 'Custom field updated.', 'mmi' ),
		3  => __( 'Custom field deleted.', 'mmi' ),
		4  => __( 'Testimony updated.', 'mmi' ),
		/* translators: %s: date and time of the revision */
		5  => isset( $_GET['revision'] ) ? sprintf( __( 'Testimony restored to revision from %s', 'mmi' ), wp_post_revision_title( (int) $_GET['revision'], false ) ) : false,
		/* translators: %s: post permalink */
		6  => sprintf( __( 'Testimony published. <a href="%s">View Testimony</a>', 'mmi' ), esc_url( $permalink ) ),
		7  => __( 'Testimony saved.', 'mmi' ),
		/* translators: %s: post permalink */
		8  => sprintf( __( 'Testimony submitted. <a target="_blank" href="%s">Preview Testimony</a>', 'mmi' ), esc_url( add_query_arg( 'preview', 'true', $permalink ) ) ),
		/* translators: 1: Publish box date format, see https://secure.php.net/date 2: Post permalink */
		9  => sprintf( __( 'Testimony scheduled for: <strong>%1$s</strong>. <a target="_blank" href="%2$s">Preview Testimony</a>', 'mmi' ),
		date_i18n( __( 'M j, Y @ G:i', 'mmi' ), strtotime( $post->post_date ) ), esc_url( $permalink ) ),
		/* translators: %s: post permalink */
		10 => sprintf( __( 'Testimony draft updated. <a target="_blank" href="%s">Preview Testimony</a>', 'mmi' ), esc_url( add_query_arg( 'preview', 'true', $permalink ) ) ),
	);

	return $messages;
}
add_filter( 'post_updated_messages', 'testimony_updated_messages' );
