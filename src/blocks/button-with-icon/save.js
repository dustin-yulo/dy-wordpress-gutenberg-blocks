import { useBlockProps, RichText } from '@wordpress/block-editor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function DYButtonWithIconSave( { attributes } ) {
	const {
		selectedFontAwesomeIcon,
		fontAwesomeIconPosition,
		buttonLink,
		buttonLinkTarget,
		buttonLinkRel,
		buttonText,
		buttonTextAlignment,
		buttonTextColor,
		buttonBackgroundColor,
		buttonBorderSettings,
		buttonBorderRadius,
		buttonWidth,
	} = attributes;

	let buttonJustifyContent;

	switch ( buttonTextAlignment ) {
		case 'left':
			buttonJustifyContent = 'flex-start';
			break;

		case 'center':
			buttonJustifyContent = 'center';
			break;

		case 'right':
			buttonJustifyContent = 'flex-end';
			break;

		default:
			buttonJustifyContent = undefined;
			break;
	}

	return (
		<a
			{ ...useBlockProps.save() }
			href={ buttonLink }
			target={ buttonLinkTarget }
			rel={ buttonLinkRel }
			role="button"
			style={ {
				color: buttonTextColor,
				backgroundColor: buttonBackgroundColor,
				borderWidth: buttonBorderSettings?.width,
				borderStyle: buttonBorderSettings?.style,
				borderColor: buttonBorderSettings?.color,
				borderRadius:
					( buttonBorderRadius?.top
						? `${ buttonBorderRadius.top.width } `
						: '' ) +
						( buttonBorderRadius?.right
							? `${ buttonBorderRadius.right.width } `
							: '' ) +
						( buttonBorderRadius?.bottom
							? `${ buttonBorderRadius.bottom.width } `
							: '' ) +
						( buttonBorderRadius?.left
							? `${ buttonBorderRadius.left.width } `
							: '' ) || buttonBorderRadius?.width,
				width: buttonWidth === 'full' ? '100%' : undefined,
				justifyContent: buttonJustifyContent,
			} }
		>
			{ Object.keys( selectedFontAwesomeIcon ).length !== 0 && (
				<FontAwesomeIcon
					icon={ selectedFontAwesomeIcon }
					className={
						'dy-wordpress-gutenberg-blocks-button-with-icon__icon' +
						( fontAwesomeIconPosition === 'left'
							? ' icon-left'
							: ' icon-right' )
					}
				/>
			) }
			<RichText.Content
				value={ buttonText }
				className="dy-wordpress-gutenberg-blocks-button-with-icon__richtext"
			/>
		</a>
	);
}
