import { __ } from '@wordpress/i18n';
import { RawHTML, useRef, useEffect } from '@wordpress/element';
import { isURL, prependHTTP } from '@wordpress/url';

export const PostCarousel = ( {
	selectedPosts,
	slidesToShow,
	slidesToScroll,
	slideAutoplay,
	slideSpeed,
	slideDuration,
	pauseOnHover,
	infiniteScroll,
	postDisplayFeaturedImage,
	postDisplayPostMetaAsImage,
	postDisplayPostMetaKey,
	postDisplayPostTitle,
	postMeta,
	postMetaSeparator,
} ) => {
	const swiperContainerRef = useRef( null );
	const swiperNextButtonRef = useRef( null );
	const swiperPrevButtonRef = useRef( null );
	const swiperPaginationContainerRef = useRef( null );

	useEffect( () => {
		const swiperParams = {
			allowTouchMove: false,
			loop: infiniteScroll,
			slidesPerGroup: slidesToScroll,
			slidesPerView: slidesToShow,
			spaceBetween: 50,
			speed: slideSpeed,
			navigation: {
				nextEl: swiperNextButtonRef.current,
				prevEl: swiperPrevButtonRef.current,
			},
			pagination: {
				clickable: true,
				el: swiperPaginationContainerRef.current,
			},
			...( slideAutoplay !== false
				? {
						autoplay: {
							delay: slideDuration,
							disableOnInteraction: false,
							pauseOnMouseEnter: pauseOnHover,
						},
				  }
				: {} ),
		};

		Object.assign( swiperContainerRef.current, swiperParams );

		swiperContainerRef.current.initialize();
	}, [
		selectedPosts,
		slidesToShow,
		slidesToScroll,
		slideAutoplay,
		slideSpeed,
		slideDuration,
		pauseOnHover,
		infiniteScroll,
		postDisplayFeaturedImage,
		postDisplayPostMetaAsImage,
		postDisplayPostMetaKey,
		postDisplayPostTitle,
		postMeta,
		postMetaSeparator,
	] );

	return (
		<>
			<swiper-container
				ref={ swiperContainerRef }
				init="false"
				class="dy-wordpress-gutenberg-blocks-post-carousel dy-post-list"
			>
				{ selectedPosts &&
					selectedPosts.length > 0 &&
					selectedPosts.map( ( selectedPost ) => {
						const selectedPostFeaturedImage =
							selectedPost._embedded &&
							selectedPost._embedded[ 'wp:featuredmedia' ] &&
							selectedPost._embedded[ 'wp:featuredmedia' ]
								.length > 0 &&
							selectedPost._embedded[ 'wp:featuredmedia' ][ 0 ];
						const selectedPostMetaImageURL =
							selectedPost.meta &&
							selectedPost.meta[ postDisplayPostMetaKey ];

						return (
							<swiper-slide
								key={ selectedPost.id }
								id={ 'post-' + selectedPost.id }
								class="dy-post-list-item"
							>
								<a
									href={ selectedPost.link }
									className="dy-post-list-item-link"
								>
									{ postDisplayFeaturedImage &&
										selectedPostFeaturedImage && (
											<div className="dy-post-list-item-image">
												<img
													className="dy-post-featured-image"
													src={
														selectedPostFeaturedImage.source_url
													}
													alt={
														selectedPostFeaturedImage.alt_text
													}
												/>
											</div>
										) }
									{ postDisplayPostMetaAsImage &&
										selectedPostMetaImageURL &&
										isURL( selectedPostMetaImageURL ) && (
											<div className="dy-post-list-item-image">
												<img
													className="dy-post-meta-image"
													src={ prependHTTP(
														selectedPostMetaImageURL
													) }
													alt=""
												/>
											</div>
										) }
									{ selectedPost.meta &&
										Object.keys( selectedPost.meta )
											.length > 0 &&
										postMeta &&
										postMeta.length > 0 && (
											<p className="dy-post-meta">
												{ postMeta.map(
													( postMetaKey, index ) => {
														const postMetaValue =
															selectedPost.meta[
																postMetaKey
															];

														if ( postMetaValue ) {
															return (
																<>
																	{
																		postMetaValue
																	}
																	{ index !==
																		postMeta.length -
																			1 && (
																		<span className="dy-post-meta-separator">
																			{ ' ' +
																				postMetaSeparator +
																				' ' }
																		</span>
																	) }
																</>
															);
														}

														return null;
													}
												) }
											</p>
										) }
									{ postDisplayPostTitle && (
										<p className="dy-post-title">
											<RawHTML>
												{ selectedPost.title.rendered }
											</RawHTML>
										</p>
									) }
								</a>
							</swiper-slide>
						);
					} ) }
			</swiper-container>
			<div className="swiper-custom-slider-controls-container">
				<div
					className="swiper-custom-navigation-button button-prev"
					ref={ swiperPrevButtonRef }
				>
					<div className="swiper-custom-navigation-button-icon">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 512 512"
						>
							<path d="M177.5 414c-8.8 3.8-19 2-26-4.6l-144-136C2.7 268.9 0 262.6 0 256s2.7-12.9 7.5-17.4l144-136c7-6.6 17.2-8.4 26-4.6s14.5 12.5 14.5 22l0 72 288 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l-288 0 0 72c0 9.6-5.7 18.2-14.5 22z" />
						</svg>
					</div>
					<div className="swiper-custom-navigation-button-text">
						{ __( 'Previous', 'dy-wordpress-gutenberg-blocks' ) }
					</div>
				</div>
				<div
					className="swiper-custom-pagination-container"
					ref={ swiperPaginationContainerRef }
				/>
				<div
					className="swiper-custom-navigation-button button-next"
					ref={ swiperNextButtonRef }
				>
					<div className="swiper-custom-navigation-button-text">
						{ __( 'Next', 'dy-wordpress-gutenberg-blocks' ) }
					</div>
					<div className="swiper-custom-navigation-button-icon">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 512 512"
						>
							<path d="M334.5 414c8.8 3.8 19 2 26-4.6l144-136c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22l0 72L32 192c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32l288 0 0 72c0 9.6 5.7 18.2 14.5 22z" />
						</svg>
					</div>
				</div>
			</div>
		</>
	);
};
