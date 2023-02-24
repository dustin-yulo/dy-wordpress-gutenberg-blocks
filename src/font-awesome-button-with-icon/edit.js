import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import './editor.scss';


export default function DYFontAwesomeButtonWithIconEdit() {
	return (
		<p { ...useBlockProps() }>
			{ __(
				'DYFontAwesomeButtonWithIconEdit',
				'dy-wordpress-gutenberg-blocks'
			) }
		</p>
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