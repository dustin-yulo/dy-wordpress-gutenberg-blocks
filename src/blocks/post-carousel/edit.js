import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	PanelRow,
	__experimentalNumberControl as NumberControl,
	ToggleControl,
	SelectControl,
	QueryControls,
	FormTokenField,
	TextControl,
} from '@wordpress/components';
import { RawHTML, useRef, useEffect } from '@wordpress/element';
import { isURL, prependHTTP } from '@wordpress/url';
import { usePostTypes, usePostTypeForPosts } from './utils';
// eslint-disable-next-line import/no-unresolved
import { register } from 'swiper/element/bundle';
import './editor.scss';

export default function DYPostCarouselEdit( { attributes, setAttributes } ) {
	const {
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
		querySource,
		queryOrder,
		queryOrderBy,
		queryNumberOfItems,
	} = attributes;

	const { postTypesSelectOptions } = usePostTypes();

	const {
		selectedPosts,
		selectedPostsMetaKeys,
		selectedPostsMetaKeysSelectOptions,
	} = usePostTypeForPosts(
		querySource,
		queryOrder,
		queryOrderBy,
		queryNumberOfItems
	);

	register();

	const PostCarousel = () => {
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
		}, [] );

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
								selectedPost._embedded[
									'wp:featuredmedia'
								][ 0 ];
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
											isURL(
												selectedPostMetaImageURL
											) && (
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
														(
															postMetaKey,
															index
														) => {
															const postMetaValue =
																selectedPost
																	.meta[
																	postMetaKey
																];

															if (
																postMetaValue
															) {
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
													{
														selectedPost.title
															.rendered
													}
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
							{ __(
								'Previous',
								'dy-wordpress-gutenberg-blocks'
							) }
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

	return (
		<>
			<div { ...useBlockProps() }>
				<PostCarousel />
			</div>
			<InspectorControls>
				<div className="dy-wordpress-gutenberg-blocks-post-carousel-inspector-controls">
					<PanelBody
						className="carousel-settings"
						title={ __(
							'Carousel settings',
							'dy-wordpress-gutenberg-blocks'
						) }
					>
						<PanelRow className="slides-to-show">
							<label htmlFor="carousel-settings__slides-to-show">
								{ __(
									'Slides to show',
									'dy-wordpress-gutenberg-blocks'
								) }
							</label>
							<NumberControl
								id="carousel-settings__slides-to-show"
								className="input-field input-type-number"
								value={ slidesToShow }
								onChange={ ( newSlidesToShow ) => {
									const parsedSlidesToShow = newSlidesToShow
										? parseInt( newSlidesToShow )
										: 1;

									setAttributes( {
										slidesToShow: parsedSlidesToShow,
									} );
								} }
								isDragEnabled={ false }
								min={ 1 }
								required={ true }
							/>
						</PanelRow>
						<PanelRow className="slides-to-scroll">
							<label htmlFor="carousel-settings__slides-to-scroll">
								{ __(
									'Slides to scroll',
									'dy-wordpress-gutenberg-blocks'
								) }
							</label>
							<NumberControl
								id="carousel-settings__slides-to-scroll"
								className="input-field input-type-number"
								value={ slidesToScroll }
								onChange={ ( newSlidesToScroll ) => {
									const parsedSlidesToScroll =
										newSlidesToScroll
											? parseInt( newSlidesToScroll )
											: 1;

									setAttributes( {
										slidesToScroll: parsedSlidesToScroll,
									} );
								} }
								isDragEnabled={ false }
								min={ 1 }
								required={ true }
							/>
						</PanelRow>
						<PanelRow className="slide-speed">
							<label htmlFor="carousel-settings__slide-speed">
								{ __(
									'Slide speed (ms)',
									'dy-wordpress-gutenberg-blocks'
								) }
							</label>
							<NumberControl
								id="carousel-settings__slide-speed"
								className="input-field input-type-number"
								value={ slideSpeed }
								onChange={ ( newSlideSpeed ) => {
									const parsedSlideSpeed = newSlideSpeed
										? parseInt( newSlideSpeed )
										: 1;

									setAttributes( {
										slideSpeed: parsedSlideSpeed,
									} );
								} }
								isDragEnabled={ false }
								min={ 1 }
								required={ true }
							/>
						</PanelRow>
						<PanelRow className="infinite-carousel-scroll">
							<ToggleControl
								id="carousel-settings__infinite-carousel-scroll"
								className="input-field input-type-checkbox toggle-control-row"
								label={ __(
									'Infinite scroll',
									'dy-wordpress-gutenberg-blocks'
								) }
								checked={ infiniteScroll }
								onChange={ ( newInfiniteScroll ) => {
									setAttributes( {
										infiniteScroll: newInfiniteScroll,
									} );
								} }
							/>
						</PanelRow>
						<PanelRow className="slide-autoplay">
							<ToggleControl
								id="carousel-settings__slide-autoplay"
								className="input-field input-type-checkbox toggle-control-row"
								label={ __(
									'Autoplay',
									'dy-wordpress-gutenberg-blocks'
								) }
								checked={ slideAutoplay }
								onChange={ ( newSlideAutoplay ) => {
									setAttributes( {
										slideAutoplay: newSlideAutoplay,
									} );
								} }
							/>
						</PanelRow>
						{ slideAutoplay && slideAutoplay !== false && (
							<>
								<PanelRow className="slide-duration">
									<label htmlFor="carousel-settings__slide-duration">
										{ __(
											'Slide duration (ms)',
											'dy-wordpress-gutenberg-blocks'
										) }
									</label>
									<NumberControl
										id="carousel-settings__slide-duration"
										className="input-field input-type-number"
										value={ slideDuration }
										onChange={ ( newSlideDuration ) => {
											const parsedSlideDuration =
												newSlideDuration
													? parseInt(
															newSlideDuration
													  )
													: 1;

											setAttributes( {
												slideDuration:
													parsedSlideDuration,
											} );
										} }
										isDragEnabled={ false }
										min={ 1 }
										required={ true }
									/>
								</PanelRow>
								<PanelRow className="pause-carousel-on-hover">
									<ToggleControl
										id="carousel-settings__pause-carousel-on-hover"
										className="input-field input-type-checkbox toggle-control-row"
										label={ __(
											'Pause carousel on hover',
											'dy-wordpress-gutenberg-blocks'
										) }
										checked={ pauseOnHover }
										onChange={ ( newPauseOnHover ) => {
											setAttributes( {
												pauseOnHover: newPauseOnHover,
											} );
										} }
									/>
								</PanelRow>
							</>
						) }
					</PanelBody>
					<PanelBody
						className="carousel-post-settings"
						title={ __(
							'Post settings',
							'dy-wordpress-gutenberg-blocks'
						) }
					>
						<PanelRow className="display-featured-image">
							<ToggleControl
								id="carousel-settings__display-featured-image"
								className="input-field input-type-checkbox toggle-control-row"
								label={ __(
									'Display featured image',
									'dy-wordpress-gutenberg-blocks'
								) }
								checked={ postDisplayFeaturedImage }
								onChange={ ( newPostDisplayFeaturedImage ) => {
									setAttributes( {
										postDisplayFeaturedImage:
											newPostDisplayFeaturedImage,
										postDisplayPostMetaAsImage:
											newPostDisplayFeaturedImage ===
												true && false,
									} );
								} }
							/>
						</PanelRow>
						{ selectedPostsMetaKeys.length > 0 && (
							<>
								<PanelRow className="display-post-meta-image">
									<ToggleControl
										id="carousel-settings__display-post-meta-image"
										className="input-field input-type-checkbox toggle-control-row"
										label={ __(
											'Display post meta as image',
											'dy-wordpress-gutenberg-blocks'
										) }
										checked={ postDisplayPostMetaAsImage }
										onChange={ (
											newPostDisplayPostMetaAsImage
										) => {
											setAttributes( {
												postDisplayPostMetaAsImage:
													newPostDisplayPostMetaAsImage,
												postDisplayFeaturedImage:
													newPostDisplayPostMetaAsImage ===
														true && false,
											} );
										} }
									/>
								</PanelRow>
								{ postDisplayPostMetaAsImage && (
									<PanelRow className="display-post-meta-image__post-meta select-row">
										<SelectControl
											label={ __(
												'Post meta with image URL',
												'dy-wordpress-gutenberg-blocks'
											) }
											value={ postDisplayPostMetaKey }
											onChange={ (
												newPostDisplayPostMetaKey
											) => {
												setAttributes( {
													postDisplayPostMetaKey:
														newPostDisplayPostMetaKey,
												} );
											} }
											options={
												selectedPostsMetaKeysSelectOptions
											}
										/>
									</PanelRow>
								) }
							</>
						) }
						<PanelRow className="display-post-title">
							<ToggleControl
								id="carousel-settings__post-title"
								className="input-field input-type-checkbox toggle-control-row"
								label={ __(
									'Display post title',
									'dy-wordpress-gutenberg-blocks'
								) }
								checked={ postDisplayPostTitle }
								onChange={ ( newPostDisplayPostTitle ) => {
									setAttributes( {
										postDisplayPostTitle:
											newPostDisplayPostTitle,
									} );
								} }
							/>
						</PanelRow>
						{ selectedPostsMetaKeys.length > 0 && (
							<>
								<PanelRow className="post-meta">
									<FormTokenField
										label={ __(
											'Post meta',
											'dy-wordpress-gutenberg-blocks'
										) }
										value={ postMeta }
										onChange={ ( tokens ) => {
											setAttributes( {
												postMeta: tokens,
											} );
										} }
										suggestions={ selectedPostsMetaKeys }
										__experimentalExpandOnFocus
										__experimentalShowHowTo={ false }
									/>
								</PanelRow>
								<PanelRow className="post-meta-separator">
									<label htmlFor="carousel-post-settings__post-meta-separator">
										{ __(
											'Post meta separator',
											'dy-wordpress-gutenberg-blocks'
										) }
									</label>
									<TextControl
										id="carousel-post-settings__post-meta-separator"
										className="input-field input-type-text-short"
										value={ postMetaSeparator }
										onChange={ ( newPostMetaSeparator ) => {
											setAttributes( {
												postMetaSeparator:
													newPostMetaSeparator,
											} );
										} }
									/>
								</PanelRow>
							</>
						) }
					</PanelBody>
					<PanelBody
						className="carousel-query-settings"
						title={ __( 'Query', 'dy-wordpress-gutenberg-blocks' ) }
					>
						<SelectControl
							label={ __(
								'Source',
								'dy-wordpress-gutenberg-blocks'
							) }
							value={ querySource }
							onChange={ ( newQuerySource ) => {
								setAttributes( {
									querySource: newQuerySource,
									postMeta: [],
								} );
							} }
							options={ postTypesSelectOptions }
						/>
						<QueryControls
							order={ queryOrder }
							onOrderChange={ ( newQueryOrder ) => {
								setAttributes( { queryOrder: newQueryOrder } );
							} }
							orderBy={ queryOrderBy }
							onOrderByChange={ ( newQueryOrderBy ) => {
								setAttributes( {
									queryOrderBy: newQueryOrderBy,
								} );
							} }
							numberOfItems={ queryNumberOfItems }
							onNumberOfItemsChange={ (
								newQueryNumberOfItems
							) => {
								setAttributes( {
									queryNumberOfItems: newQueryNumberOfItems,
								} );
							} }
						/>
					</PanelBody>
				</div>
			</InspectorControls>
		</>
	);
}
