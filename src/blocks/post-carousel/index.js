import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import DYPostCarouselMetaData from './block.json';
import DYPostCarouselEdit from './edit';
import DYPostCarouselSave from './save';
import './style.scss';

registerBlockType( DYPostCarouselMetaData.name, {
	styles: [
		{
			name: 'dy-post-carousel-style-1',
			label: __( 'Style 1', 'dy-wordpress-gutenberg-blocks' ),
			isDefault: true,
		},
	],
	edit: DYPostCarouselEdit,
	save: DYPostCarouselSave,
} );
