import { __, _x } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import {
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
	__experimentalBorderBoxControl as BorderBoxControl,
	__experimentalBorderControl as BorderControl,
} from '@wordpress/components';

export default function DYBorderToolsPanel( props ) {
	const {
		borderOptions,
		resetAllBorders,
		borderShorthand,
		onBorderShorthandChange,
		onBorderShorthandDeselect,
		borderRadius,
		onBorderRadiusChange,
		onBorderRadiusDeselect,
	} = props;

	const websitePresetcolors = useSelect( ( select ) => {
		return select( 'core/editor' ).getEditorSettings().colors;
	} );

	return (
		<ToolsPanel
			label={ __( 'Border', 'dy-wordpress-gutenberg-blocks' ) }
			resetAll={ resetAllBorders }
			__experimentalFirstVisibleItemClass="first"
			__experimentalLastVisibleItemClass="last"
			className="border-block-support-panel dy-border-tools-panel"
			hasInnerWrapper={ true }
		>
			<style>
				{
					'.dy-border-tools-panel .dy-border-tools-panel__border-radius .components-input-control__prefix { display: none; }'
				}
			</style>
			<div>
				{ borderOptions.includes( 'border' ) && (
					<ToolsPanelItem
						hasValue={ () => !! borderShorthand }
						label={ _x(
							'Border',
							'tools panel border settings',
							'dy-wordpress-gutenberg-blocks'
						) }
						isShownByDefault={ true }
						onDeselect={ onBorderShorthandDeselect }
					>
						<BorderControl
							label={ __(
								'Border (width, style, color)',
								'dy-wordpress-gutenberg-blocks'
							) }
							value={ borderShorthand }
							onChange={ onBorderShorthandChange }
							colors={ websitePresetcolors }
							size="__unstable-large"
							width="156px"
							withSlider={ true }
							shouldSanitizeBorder={ false }
							__unstablePopoverProps={ {
								placement: 'left-start',
								offset: 35,
							} }
							className="dy-border-tools-panel__border-settings"
						/>
					</ToolsPanelItem>
				) }
				{ borderOptions.includes( 'radius' ) && (
					<ToolsPanelItem
						hasValue={ () => !! borderRadius }
						label={ _x(
							'Radius',
							'tools panel border radius',
							'dy-wordpress-gutenberg-blocks'
						) }
						isShownByDefault={ true }
						onDeselect={ onBorderRadiusDeselect }
					>
						<BorderBoxControl
							label={ __(
								'Radius',
								'dy-wordpress-gutenberg-blocks'
							) }
							onChange={ onBorderRadiusChange }
							value={ borderRadius }
							disableCustomColors={ true }
							enableStyle={ false }
							size="__unstable-large"
							className="dy-border-tools-panel__border-radius"
						/>
					</ToolsPanelItem>
				) }
			</div>
		</ToolsPanel>
	);
}
