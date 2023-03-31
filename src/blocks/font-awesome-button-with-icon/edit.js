import { __, _x } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';
import {
	PanelBody,
	PanelRow,
	Button,
	Modal,
	SelectControl,
	SearchControl,
	CheckboxControl,
} from '@wordpress/components';
import DYColorToolsPanel from '../../components/tools-panel/colors';
import { useState } from '@wordpress/element';
import { FixedSizeGrid } from 'react-window';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import './editor.scss';

export default function DYFontAwesomeButtonWithIconEdit( {
	attributes,
	setAttributes,
} ) {
	const {
		selectedFontAwesomeIcon,
		fontAwesomeIconPosition,
		buttonText,
		buttonTextColor,
		buttonBackgroundColor,
		buttonBorderColor,
	} = attributes;

	const [ isIconFinderOpen, setIconFinderOpen ] = useState( false );
	const openIconFinder = () => setIconFinderOpen( true );
	const closeIconFinder = () => setIconFinderOpen( false );

	const [ iconFinderSearchInput, setIconFinderSearchInput ] = useState( '' );

	const [
		fontAwesomeIconCategoriesSelected,
		setFontAwesomeIconCategoriesSelected,
	] = useState( [] );

	const allFontAwesomeIcons = [
		...new Set(
			[
				...Object.values( fas ),
				...Object.values( far ),
				...Object.values( fab ),
			].map( ( icon ) => JSON.stringify( icon ) )
		),
	]
		.map( ( icon ) => JSON.parse( icon ) )
		.sort( ( a, b ) => a.iconName.localeCompare( b.iconName ) );

	library.add( ...allFontAwesomeIcons );

	const filteredFontAwesomeIcons = allFontAwesomeIcons.filter( ( icon ) => {
		return (
			icon.iconName
				.toLowerCase()
				.includes( iconFinderSearchInput.toLowerCase() ) &&
			( fontAwesomeIconCategoriesSelected.includes( icon.prefix ) ||
				fontAwesomeIconCategoriesSelected.length === 0 )
		);
	} );

	const FontAwesomeIconCategories = () => {
		const onFontAwesomeIconCategoriesSelectedChange = ( iconPrefix ) => {
			const iconPrefixArrayPosition =
				fontAwesomeIconCategoriesSelected.indexOf( iconPrefix );

			if ( iconPrefixArrayPosition > -1 ) {
				const newFontAwesomeIconCategoriesSelected = [
					...fontAwesomeIconCategoriesSelected,
				];

				newFontAwesomeIconCategoriesSelected.splice(
					iconPrefixArrayPosition,
					1
				);
				setFontAwesomeIconCategoriesSelected(
					newFontAwesomeIconCategoriesSelected
				);
			} else {
				setFontAwesomeIconCategoriesSelected( [
					...fontAwesomeIconCategoriesSelected,
					iconPrefix,
				] );
			}
		};

		return (
			<div className="dy-wordpress-gutenberg-blocks-font-awesome-button-with-icon__icon-finder-modal__icon-category-container">
				<CheckboxControl
					label="Solid"
					checked={ fontAwesomeIconCategoriesSelected.includes(
						'fas'
					) }
					onChange={ () =>
						onFontAwesomeIconCategoriesSelectedChange( 'fas' )
					}
					className={
						'dy-wordpress-gutenberg-blocks-font-awesome-button-with-icon__icon-finder-modal__icon-category' +
						( fontAwesomeIconCategoriesSelected.includes( 'fas' )
							? ' checked'
							: '' )
					}
				/>
				<CheckboxControl
					label="Regular"
					checked={ fontAwesomeIconCategoriesSelected.includes(
						'far'
					) }
					onChange={ () =>
						onFontAwesomeIconCategoriesSelectedChange( 'far' )
					}
					className={
						'dy-wordpress-gutenberg-blocks-font-awesome-button-with-icon__icon-finder-modal__icon-category' +
						( fontAwesomeIconCategoriesSelected.includes( 'far' )
							? ' checked'
							: '' )
					}
				/>
				<CheckboxControl
					label="Brands"
					checked={ fontAwesomeIconCategoriesSelected.includes(
						'fab'
					) }
					onChange={ () =>
						onFontAwesomeIconCategoriesSelectedChange( 'fab' )
					}
					className={
						'dy-wordpress-gutenberg-blocks-font-awesome-button-with-icon__icon-finder-modal__icon-category' +
						( fontAwesomeIconCategoriesSelected.includes( 'fab' )
							? ' checked'
							: '' )
					}
				/>
			</div>
		);
	};

	const FontAwesomeIconsGrid = () => {
		const numberOfColumns = 6;
		const numberOfRows = 3;

		const Cell = ( { columnIndex, rowIndex, style } ) => {
			const index = rowIndex * numberOfColumns + columnIndex;

			if ( index >= filteredFontAwesomeIcons.length ) return null;

			const icon = filteredFontAwesomeIcons[ index ];
			const cellStyle = {
				...style,
				padding: 10,
			};

			let iconCategory = '';

			switch ( icon.prefix ) {
				case 'fas':
					iconCategory = '(solid)';
					break;

				case 'far':
					iconCategory = '(regular)';
					break;

				case 'fab':
					iconCategory = '(brands)';
					break;

				default:
					iconCategory = '';
					break;
			}

			return (
				<li style={ cellStyle }>
					<Button
						icon={ <FontAwesomeIcon icon={ icon } /> }
						label={ icon.iconName + ' ' + iconCategory }
						variant={
							icon.prefix === selectedFontAwesomeIcon.prefix &&
							icon.iconName === selectedFontAwesomeIcon.iconName
								? 'primary'
								: 'secondary'
						}
						onClick={ () => {
							setAttributes( { selectedFontAwesomeIcon: icon } );
							setIconFinderOpen( false );
						} }
					>
						<span>{ icon.iconName }</span>
					</Button>
				</li>
			);
		};

		return (
			<FixedSizeGrid
				className="dy-wordpress-gutenberg-blocks-font-awesome-button-with-icon__icon-finder-modal__icon-grid"
				columnCount={ numberOfColumns }
				columnWidth={ 120 }
				rowCount={ Math.ceil(
					filteredFontAwesomeIcons.length / numberOfColumns
				) }
				rowHeight={ 120 }
				width={ numberOfColumns * 120 + 20 }
				height={ numberOfRows * 120 + 20 }
				padding={ 10 }
			>
				{ Cell }
			</FixedSizeGrid>
		);
	};

	return (
		<div
			{ ...useBlockProps() }
			style={ {
				color: buttonTextColor,
				backgroundColor: buttonBackgroundColor,
				borderColor: buttonBorderColor,
			} }
		>
			<InspectorControls>
				<div className="dy-wordpress-gutenberg-blocks-font-awesome-button-with-icon-inspector-controls">
					<PanelBody
						title={ __( 'Icon', 'dy-wordpress-gutenberg-blocks' ) }
					>
						<PanelRow>
							<strong>
								{ __(
									'Icon',
									'dy-wordpress-gutenberg-blocks'
								) }
							</strong>
							<div className="dy-icon-buttons-container">
								{ Object.keys( selectedFontAwesomeIcon )
									.length !== 0 && (
									<Button
										variant="secondary"
										isDestructive={ true }
										onClick={ () =>
											setAttributes( {
												selectedFontAwesomeIcon: {},
											} )
										}
										text={ __(
											'Remove',
											'dy-wordpress-gutenberg-blocks'
										) }
									/>
								) }
								<Button
									variant="secondary"
									onClick={ openIconFinder }
									text={ __(
										'Select',
										'dy-wordpress-gutenberg-blocks'
									) }
								/>
							</div>
						</PanelRow>
						<PanelRow>
							<strong>
								{ __(
									'Icon position',
									'dy-wordpress-gutenberg-blocks'
								) }
							</strong>
							<div className="dy-icon-position-dropdown-container">
								<SelectControl
									value={ fontAwesomeIconPosition }
									onChange={ ( newFontAwesomeIconPosition ) =>
										setAttributes( {
											fontAwesomeIconPosition:
												newFontAwesomeIconPosition,
										} )
									}
									options={ [
										{
											label: _x(
												'Left',
												'icon position - left',
												'dy-wordpress-gutenberg-blocks'
											),
											value: 'left',
										},
										{
											label: _x(
												'Right',
												'icon position - right',
												'dy-wordpress-gutenberg-blocks'
											),
											value: 'right',
										},
									] }
								/>
							</div>
						</PanelRow>
					</PanelBody>
					<DYColorToolsPanel
						colorOptions={ [ 'text', 'background', 'border' ] }
						resetAllColors={ () => {
							setAttributes( { buttonTextColor: undefined } );
							setAttributes( {
								buttonBackgroundColor: undefined,
							} );
							setAttributes( { buttonBorderColor: undefined } );
						} }
						textColor={ buttonTextColor }
						onTextColorDeselect={ () =>
							setAttributes( { buttonTextColor: undefined } )
						}
						onTextColorChange={ ( newButtonTextColor ) =>
							setAttributes( {
								buttonTextColor: newButtonTextColor,
							} )
						}
						backgroundColor={ buttonBackgroundColor }
						onBackgroundColorDeselect={ () =>
							setAttributes( {
								buttonBackgroundColor: undefined,
							} )
						}
						onBackgroundColorChange={ (
							newButtonBackgroundColor
						) =>
							setAttributes( {
								buttonBackgroundColor: newButtonBackgroundColor,
							} )
						}
						borderColor={ buttonBorderColor }
						onBorderColorDeselect={ () =>
							setAttributes( { buttonBorderColor: undefined } )
						}
						onBorderColorChange={ ( newButtonBorderColor ) =>
							setAttributes( {
								buttonBorderColor: newButtonBorderColor,
							} )
						}
					/>
				</div>
			</InspectorControls>

			{ isIconFinderOpen && (
				<Modal
					title={ __(
						'Select a Font Awesome icon',
						'dy-wordpress-gutenberg-blocks'
					) }
					closeButtonLabel={ __(
						'Close',
						'dy-wordpress-gutenberg-blocks'
					) }
					onRequestClose={ closeIconFinder }
					className="dy-wordpress-gutenberg-blocks-font-awesome-button-with-icon__icon-finder-modal"
				>
					<SearchControl
						value={ iconFinderSearchInput }
						onChange={ ( userInput ) =>
							setIconFinderSearchInput( userInput )
						}
					/>
					<FontAwesomeIconCategories />
					<FontAwesomeIconsGrid />
				</Modal>
			) }

			{ Object.keys( selectedFontAwesomeIcon ).length !== 0 && (
				<FontAwesomeIcon
					icon={ selectedFontAwesomeIcon }
					className={
						'dy-wordpress-gutenberg-blocks-font-awesome-button-with-icon__icon' +
						( fontAwesomeIconPosition === 'left'
							? ' icon-left'
							: ' icon-right' )
					}
				/>
			) }
			<RichText
				value={ buttonText }
				onChange={ ( newButtonText ) =>
					setAttributes( { buttonText: newButtonText } )
				}
				placeholder={ __(
					'Add text…',
					'dy-wordpress-gutenberg-blocks'
				) }
				className="dy-wordpress-gutenberg-blocks-font-awesome-button-with-icon__richtext"
			/>
		</div>
	);
}