import { useBlockProps } from '@wordpress/block-editor';

export default function DYFontAwesomeButtonWithIconSave() {
	return (
		<p { ...useBlockProps.save() }>{ 'DYFontAwesomeButtonWithIconSave' }</p>
	);
}

/*
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

export default function DYTechPortfolioButtonoWithFontAwesomeIconSave( { attributes } ) {
	const { buttonText, fontAwesomeClass, iconPosition, textAlign } = attributes;

	return (
		<div>
			
		</div>
	);
}
*/
