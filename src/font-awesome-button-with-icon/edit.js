import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, FormTokenField } from '@wordpress/components';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import './editor.scss';


export default function DYFontAwesomeButtonWithIconEdit( { attributes, setAttributes } ) {

	const { fontAwesomeClass } = attributes;

	const allFontAwesomeIcons = [
		...Object.values( fas ),
		...Object.values( far ),
		...Object.values( fab )
	];

	library.add( ...allFontAwesomeIcons );
	//dom.watch();
	
	const fontAwesomeIconSuggestions = [];

	allFontAwesomeIcons.forEach( ( eachFontAwesomeIcon ) => {
		const eachFontAwesomeIconPrefix = eachFontAwesomeIcon.prefix === 'fas' ? 'fa-solid'
											: eachFontAwesomeIcon.prefix === 'far' ? 'fa-regular'
											: eachFontAwesomeIcon.prefix === 'fab' ? 'fa-brands'
											: '';
		const eachFontAwesomeIconDetails = eachFontAwesomeIconPrefix + ' ' + eachFontAwesomeIcon.iconName;

		if ( !fontAwesomeIconSuggestions.includes( eachFontAwesomeIconDetails ) ) {
			fontAwesomeIconSuggestions.push( eachFontAwesomeIconDetails );
		}
	} );

	const onSelectedFontAwesomeIconsChange = ( tokens ) => {
		const selectedFontAwesomeIcons = [ ...fontAwesomeClass ];

		tokens.forEach( ( postName ) => {
			if( !selectedFontAwesomeIcons.includes( postName ) ) {
				selectedFontAwesomeIcons.push( postName );
			}
		} );

		setAttributes( { fontAwesomeClass: selectedFontAwesomeIcons } );
	};


	return (
		<div { ...useBlockProps() }>
			{ __(
				'DYFontAwesomeButtonWithIconEdit',
				'dy-wordpress-gutenberg-blocks'
			) }
			<InspectorControls>
				<PanelBody>
					<FormTokenField
						label={ __( 'Font Awesome icon class name', 'dy-wordpress-gutenberg-blocks' ) }
						value={ fontAwesomeClass }
						onChange={ onSelectedFontAwesomeIconsChange }
						suggestions={ fontAwesomeIconSuggestions }
						maxLength={ 1 }
					/>
					{/* <ComboboxControl
						label={ __( 'Select an icon', 'dy-wordpress-gutenberg-blocks' ) }
						onChange={ ( newFontAwesomeClass ) => setAttributes( { fontAwesomeClass: newFontAwesomeClass } ) }
						onFilterValueChange={ ( newFontAwesomeClass ) => setAttributes( { fontAwesomeClass: newFontAwesomeClass } ) }
						options={fontAwesomeIconOptions}
						value={ fontAwesomeClass }
					/> */}
				</PanelBody>
			</InspectorControls>
		</div>
	);
}

/*
import { __, _x } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls, BlockControls, AlignmentToolbar } from '@wordpress/block-editor';
import { Button, PanelBody, TextControl, Tip, RadioControl } from '@wordpress/components';
import './editor.scss';

export default function DYTechPortfolioButtonoWithFontAwesomeIconEdit( { attributes, setAttributes } ) {

	const { buttonText, fontAwesomeClass, iconPosition, textAlign } = attributes;

	return (
		<div { ...useBlockProps( { className: 'dy-tech-portfolio-button-with-font-awesome-icon' } ) }>
			<InspectorControls>
				<PanelBody>
					<TextControl
						label={ __( 'Font Awesome class', 'dy-tech-portfolio' ) }
						help={
							<>
								{ __( 'Find the Font Awesome icon class you want to use ', 'dy-tech-portfolio' ) }
								<a href="https://fontawesome.com/icons" target="_blank">
									{ __( 'here', 'dy-tech-portfolio' ) }
								</a>
							</>
						}
						value={ fontAwesomeClass }
						onChange={ ( newFontAwesomeClass ) => setAttributes( { fontAwesomeClass: newFontAwesomeClass } ) }
					/>
					<Tip>
						{ __( 'Get only the class names and not the whole HTML element', 'dy-tech-portfolio' ) }
						<br /><br />
						{ __( 'Example:', 'dy-tech-portfolio' ) }
						<br />
						<b>fa-solid fa-font-awesome</b>
					</Tip>
					<br /><br />
					<RadioControl
						label={ __( 'Icon position', 'dy-tech-portfolio' ) }
						selected={ iconPosition }
						onChange={ ( newIconPosition ) => setAttributes( { iconPosition: newIconPosition } ) }
						options={ [
							{
								label: _x( 'Left', 'left icon position', 'dy-tech-portfolio' ),
								value: 'left'
							},
							{
								label: _x( 'Right', 'right icon position', 'dy-tech-portfolio' ),
								value: 'right'
							}
						] }
					/>
				</PanelBody>
			</InspectorControls>

			<BlockControls>
				<AlignmentToolbar
					value={textAlign}
					onChange={(v) => setAttributes({ textAlign: v })}
				/>
			</BlockControls>

			<RichText
				placeholder={ __( 'Add text...', 'dy-tech-portfolio' ) }
				value={ buttonText }
				onChange={ ( newButtonText ) => setAttributes( { buttonText: newButtonText } ) }
				style={{ textAlign }}
			/>
		</div>
	);
}
*/