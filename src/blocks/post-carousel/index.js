import { registerBlockType } from '@wordpress/blocks';
import DYPostCarouselMetaData from './block.json';
import DYPostCarouselEdit from './edit';
import DYPostCarouselSave from './save';
import './style.scss';

registerBlockType( DYPostCarouselMetaData.name, {
	edit: DYPostCarouselEdit,
	save: DYPostCarouselSave,
} );
