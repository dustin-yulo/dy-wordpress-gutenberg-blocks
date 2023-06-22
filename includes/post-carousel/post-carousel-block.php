<?php

function dy_post_carousel_block( $attributes ) {

	$querySource = isset( $attributes[ 'querySource' ] ) ? $attributes[ 'querySource' ] : 'post';
	$queryOrder = isset( $attributes[ 'queryOrder' ] ) ? $attributes[ 'queryOrder' ] : 'desc';
	$queryOrderBy = isset( $attributes[ 'queryOrderBy' ] ) ? $attributes[ 'queryOrderBy' ] : 'date';
	$queryNumberOfItems = isset( $attributes[ 'queryNumberOfItems' ] ) ? $attributes[ 'queryNumberOfItems' ] : 10;

	$postDisplayFeaturedImage = isset( $attributes[ 'postDisplayFeaturedImage' ] ) ? $attributes[ 'postDisplayFeaturedImage' ] : true;
	$postDisplayPostMetaAsImage = isset( $attributes[ 'postDisplayPostMetaAsImage' ] ) ? $attributes[ 'postDisplayPostMetaAsImage' ] : false;
	$postDisplayPostMetaKey = isset( $attributes[ 'postDisplayPostMetaKey' ] ) ? $attributes[ 'postDisplayPostMetaKey' ] : '';
	$postDisplayPostTitle = isset( $attributes[ 'postDisplayPostTitle' ] ) ? $attributes[ 'postDisplayPostTitle' ] : true;

	$postMeta = isset( $attributes[ 'postMeta' ] ) ? $attributes[ 'postMeta' ] : [];
	$postMetaSeparator = isset( $attributes[ 'postMetaSeparator' ] ) ? $attributes[ 'postMetaSeparator' ] : '|';

	$infiniteScroll = isset( $attributes[ 'infiniteScroll' ] ) ? $attributes[ 'infiniteScroll' ] : true;
	$slidesToScroll = isset( $attributes[ 'slidesToScroll' ] ) ? $attributes[ 'slidesToScroll' ] : 1;
	$slidesToShow = isset( $attributes[ 'slidesToShow' ] ) ? $attributes[ 'slidesToShow' ] : 3;
	$slideSpeed = isset( $attributes[ 'slideSpeed' ] ) ? $attributes[ 'slideSpeed' ] : 300;
	$slideAutoplay = isset( $attributes[ 'slideAutoplay' ] ) ? $attributes[ 'slideAutoplay' ] : true;
	$slideDuration = isset( $attributes[ 'slideDuration' ] ) ? $attributes[ 'slideDuration' ] : 5000;
	$pauseOnHover = isset( $attributes[ 'pauseOnHover' ] ) ? $attributes[ 'pauseOnHover' ] : true;

	$swiper_attributes  = 'allow-touch-move=false';
	$swiper_attributes .= ' loop=' . $infiniteScroll . '';
	$swiper_attributes .= ' slides-per-group=' . $slidesToScroll . '';
	$swiper_attributes .= ' slides-per-view=' . $slidesToShow . '';
	$swiper_attributes .= ' space-between=50';
	$swiper_attributes .= ' speed=' . $slideSpeed . '';
	$swiper_attributes .= ' navigation-next-el=.swiper-custom-navigation-button.button-next';
	$swiper_attributes .= ' navigation-prev-el=.swiper-custom-navigation-button.button-prev';
	$swiper_attributes .= ' pagination-clickable=true';
	$swiper_attributes .= ' pagination-el=.swiper-custom-pagination-container';

	if( $slideAutoplay ) {
		$swiper_attributes .= ' autoplay-delay=' . $slideDuration . '';
		$swiper_attributes .= ' autoplay-disable-on-interaction=false';
		$swiper_attributes .= ' autoplay-pause-on-mouse-enter=' . $pauseOnHover . '';
	}


	$selectedPosts = get_posts( [
		'post_type' => $querySource,
		'order' => $queryOrder,
		'orderby' => $queryOrderBy,
		'numberposts' => $queryNumberOfItems,
		'post_status' => 'publish'
	] );
	
	$dy_post_carousel = '<div ' . get_block_wrapper_attributes() . '>';

	if( $selectedPosts && !empty( $selectedPosts ) && is_array( $selectedPosts ) ) {
		$dy_post_carousel .= '<swiper-container ' . esc_attr( $swiper_attributes ) . ' class="dy-wordpress-gutenberg-blocks-post-carousel dy-post-list">';
			
			foreach( $selectedPosts as $selectedPost ) {
				$selectedPostID = $selectedPost->ID;
				$selectedPostPermalink = get_permalink( $selectedPost );
				$selectedPostFeaturedImage = get_the_post_thumbnail_url( $selectedPost, 'large' );
				$selectedPostFeaturedImageAltText = get_post_meta( get_post_thumbnail_id( $selectedPost ), '_wp_attachment_image_alt', true );
				$selectedPostTitle = $selectedPost->post_title;
				$selectedPostMetaImageURL = get_post_meta( $selectedPostID, $postDisplayPostMetaKey, true );
				$selectedPostMetaImageAltText = get_post_meta( attachment_url_to_postid( $selectedPostMetaImageURL ), '_wp_attachment_image_alt', true );

				$dy_post_carousel .= '<swiper-slide id="' . esc_attr( $selectedPostID ) . '" class="dy-post-list-item">';
					$dy_post_carousel .= '<a href="' . esc_url( $selectedPostPermalink ) . '" class="dy-post-list-item-link">';

						if( $postDisplayFeaturedImage && $selectedPostFeaturedImage ) {
							$dy_post_carousel .= '<div class="dy-post-list-item-image">';
								$dy_post_carousel .= '<img src="' . esc_url( $selectedPostFeaturedImage ) . '" alt="' . esc_attr( $selectedPostFeaturedImageAltText ) . '" class="dy-post-featured-image" />';
							$dy_post_carousel .= '</div>';
						}

						if( $postDisplayPostMetaAsImage && $selectedPostMetaImageURL && wp_http_validate_url( $selectedPostMetaImageURL ) ) {
							$dy_post_carousel .= '<div class="dy-post-list-item-image">';
								$dy_post_carousel .= '<img src="' . esc_url( $selectedPostMetaImageURL ) . '" alt="' . esc_attr( $selectedPostMetaImageAltText ) . '" class="dy-post-meta-image" />';
							$dy_post_carousel .= '</div>';
						}

						if( !empty( $postMeta ) ) {
							$dy_post_carousel .= '<p class="dy-post-meta">';

							foreach( $postMeta as $index => $postMetaKey ) {
								$postMetaValue = get_post_meta( $selectedPostID, $postMetaKey, true );

								if( $postMetaValue ) {
									$dy_post_carousel .= esc_html( $postMetaValue );

									if( $index !== count( $postMeta ) - 1 ) {
										$dy_post_carousel .= '<span class="dy-post-meta-separator">';
										$dy_post_carousel .= ' ' . $postMetaSeparator . ' ';
										$dy_post_carousel .= '</span>';
									}
								}
							}

							$dy_post_carousel .= '</p>';
						}

						if( $postDisplayPostTitle ) {
							$dy_post_carousel .= '<p class="dy-post-title">' . esc_html( $selectedPostTitle ) . '</p>';
						}
						
					$dy_post_carousel .= '</a>';
				$dy_post_carousel .= '</swiper-slide>';
			}
		
		$dy_post_carousel .= '</swiper-container>';
		$dy_post_carousel .= '<div class="swiper-custom-slider-controls-container">';

			$dy_post_carousel .= '<div class="swiper-custom-navigation-button button-prev">';

				$dy_post_carousel .= '<div class="swiper-custom-navigation-button-icon">';
					$dy_post_carousel .= '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">';
						$dy_post_carousel .= '<path d="M177.5 414c-8.8 3.8-19 2-26-4.6l-144-136C2.7 268.9 0 262.6 0 256s2.7-12.9 7.5-17.4l144-136c7-6.6 17.2-8.4 26-4.6s14.5 12.5 14.5 22l0 72 288 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l-288 0 0 72c0 9.6-5.7 18.2-14.5 22z" />';
					$dy_post_carousel .= '</svg>';
				$dy_post_carousel .= '</div>';

				$dy_post_carousel .= '<div class="swiper-custom-navigation-button-text">';
					$dy_post_carousel .= esc_html__( 'Previous', 'dy-wordpress-gutenberg-blocks' );
				$dy_post_carousel .= '</div>';

			$dy_post_carousel .= '</div>';

			$dy_post_carousel .= '<div class="swiper-custom-pagination-container"></div>';

			$dy_post_carousel .= '<div class="swiper-custom-navigation-button button-next">';

				$dy_post_carousel .= '<div class="swiper-custom-navigation-button-text">';
					$dy_post_carousel .= esc_html__( 'Next', 'dy-wordpress-gutenberg-blocks' );
				$dy_post_carousel .= '</div>';
				
				$dy_post_carousel .= '<div class="swiper-custom-navigation-button-icon">';
					$dy_post_carousel .= '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">';
						$dy_post_carousel .= '<path d="M334.5 414c8.8 3.8 19 2 26-4.6l144-136c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22l0 72L32 192c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32l288 0 0 72c0 9.6 5.7 18.2 14.5 22z" />';
					$dy_post_carousel .= '</svg>';
				$dy_post_carousel .= '</div>';

			$dy_post_carousel .= '</div>';

		$dy_post_carousel .= '</div>';
	}

	$dy_post_carousel .= '</div>';

	return $dy_post_carousel;
}
