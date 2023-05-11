import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

export default function DYPostCarouselSave() {
	return (
		<div { ...useBlockProps.save() }>
			{ __( 'DYPostCarouselSave', 'dy-wordpress-gutenberg-blocks' ) }
		</div>
	);
}
