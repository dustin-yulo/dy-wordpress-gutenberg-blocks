import { __, _x } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import {
	Button,
	ColorIndicator,
	ColorPalette,
	Dropdown,
	FlexItem,
	__experimentalHStack as HStack,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
	__experimentalDropdownContentWrapper as DropdownContentWrapper,
} from '@wordpress/components';

export default function DYColorToolsPanel( props ) {
	const {
		colorOptions,
		resetAllColors,
		textColor,
		onTextColorDeselect,
		onTextColorChange,
		backgroundColor,
		onBackgroundColorDeselect,
		onBackgroundColorChange,
	} = props;

	const websitePresetcolors = useSelect( ( select ) => {
		return select( 'core/editor' ).getEditorSettings().colors;
	} );

	return (
		<ToolsPanel
			label={ __( 'Colors', 'dy-wordpress-gutenberg-blocks' ) }
			resetAll={ resetAllColors }
			__experimentalFirstVisibleItemClass="first"
			__experimentalLastVisibleItemClass="last"
			className="color-block-support-panel"
			hasInnerWrapper={ true }
		>
			<div className="color-block-support-panel__inner-wrapper">
				{ colorOptions.includes( 'text' ) && (
					<ToolsPanelItem
						hasValue={ () => !! textColor }
						label={ _x(
							'Text',
							'tools panel text color',
							'dy-wordpress-gutenberg-blocks'
						) }
						isShownByDefault={ true }
						onDeselect={ onTextColorDeselect }
						className="block-editor-tools-panel-color-gradient-settings__item"
					>
						<Dropdown
							className="block-editor-tools-panel-color-gradient-settings__dropdown"
							popoverProps={ {
								placement: 'left-start',
								offset: 35,
							} }
							renderToggle={ ( { isOpen, onToggle } ) => (
								<Button
									onClick={ onToggle }
									aria-expanded={ isOpen }
									className="block-editor-panel-color-gradient-settings__dropdown"
								>
									<HStack justify="flex-start">
										<ColorIndicator
											colorValue={ textColor }
											className="block-editor-panel-color-gradient-settings__color-indicator"
										/>
										<FlexItem className="block-editor-panel-color-gradient-settings__color-name">
											{ __(
												'Text',
												'dy-wordpress-gutenberg-blocks'
											) }
										</FlexItem>
									</HStack>
								</Button>
							) }
							renderContent={ () => (
								<DropdownContentWrapper paddingSize="none">
									<div className="block-editor-panel-color-gradient-settings__dropdown-content">
										<div className="block-editor-color-gradient-control__panel">
											<ColorPalette
												value={ textColor }
												onChange={ onTextColorChange }
												__experimentalIsRenderedInSidebar={
													true
												}
												enableAlpha={ true }
												colors={ websitePresetcolors }
											/>
										</div>
									</div>
								</DropdownContentWrapper>
							) }
						/>
					</ToolsPanelItem>
				) }
				{ colorOptions.includes( 'background' ) && (
					<ToolsPanelItem
						hasValue={ () => !! backgroundColor }
						label={ _x(
							'Background',
							'tools panel background color',
							'dy-wordpress-gutenberg-blocks'
						) }
						isShownByDefault={ true }
						onDeselect={ onBackgroundColorDeselect }
						className="block-editor-tools-panel-color-gradient-settings__item"
					>
						<Dropdown
							className="block-editor-tools-panel-color-gradient-settings__dropdown"
							popoverProps={ {
								placement: 'left-start',
								offset: 35,
							} }
							renderToggle={ ( { isOpen, onToggle } ) => (
								<Button
									onClick={ onToggle }
									aria-expanded={ isOpen }
									className="block-editor-panel-color-gradient-settings__dropdown"
								>
									<HStack justify="flex-start">
										<ColorIndicator
											colorValue={ backgroundColor }
											className="block-editor-panel-color-gradient-settings__color-indicator"
										/>
										<FlexItem className="block-editor-panel-color-gradient-settings__color-name">
											{ __(
												'Background',
												'dy-wordpress-gutenberg-blocks'
											) }
										</FlexItem>
									</HStack>
								</Button>
							) }
							renderContent={ () => (
								<DropdownContentWrapper paddingSize="none">
									<div className="block-editor-panel-color-gradient-settings__dropdown-content">
										<div className="block-editor-color-gradient-control__panel">
											<ColorPalette
												value={ backgroundColor }
												onChange={
													onBackgroundColorChange
												}
												__experimentalIsRenderedInSidebar={
													true
												}
												enableAlpha={ true }
												colors={ websitePresetcolors }
											/>
										</div>
									</div>
								</DropdownContentWrapper>
							) }
						/>
					</ToolsPanelItem>
				) }
			</div>
		</ToolsPanel>
	);
}
