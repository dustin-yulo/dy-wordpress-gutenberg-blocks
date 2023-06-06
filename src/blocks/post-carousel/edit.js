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
import { usePostTypes, usePostTypeForPosts } from './utils';
import { PostCarousel } from './carousel';
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

	return (
		<>
			<div { ...useBlockProps() }>
				<PostCarousel
					selectedPosts={ selectedPosts }
					slidesToShow={ slidesToShow }
					slidesToScroll={ slidesToScroll }
					slideAutoplay={ slideAutoplay }
					slideSpeed={ slideSpeed }
					slideDuration={ slideDuration }
					pauseOnHover={ pauseOnHover }
					infiniteScroll={ infiniteScroll }
					postDisplayFeaturedImage={ postDisplayFeaturedImage }
					postDisplayPostMetaAsImage={ postDisplayPostMetaAsImage }
					postDisplayPostMetaKey={ postDisplayPostMetaKey }
					postDisplayPostTitle={ postDisplayPostTitle }
					postMeta={ postMeta }
					postMetaSeparator={ postMetaSeparator }
				/>
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
