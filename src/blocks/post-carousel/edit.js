import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import './editor.scss';

export default function DYPostCarouselEdit() {
	return (
		<>
			<div { ...useBlockProps() }>
				{ __( 'DYPostCarouselEdit', 'dy-wordpress-gutenberg-blocks' ) }
			</div>
			<InspectorControls>
				<div className="dy-wordpress-gutenberg-blocks-post-carousel-inspector-controls">
					<PanelBody
						title={ __(
							'Carousel settings',
							'dy-wordpress-gutenberg-blocks'
						) }
					/>
				</div>
			</InspectorControls>
		</>
	);
}
