import { useSelect } from '@wordpress/data';
import { useMemo } from '@wordpress/element';

/**
 * Returns a helper object that contains:
 * 1. An `options` object from the available post types, to be passed to a `SelectControl`.
 *
 * @return {Object} The helper object related to post types.
 */
export const usePostTypes = () => {
	const postTypes = useSelect( ( select ) => {
		const { getPostTypes } = select( 'core' );
		const excludedPostTypes = [ 'attachment' ];
		const filteredPostTypes = getPostTypes( { per_page: -1 } )?.filter(
			( { viewable, slug } ) =>
				viewable && ! excludedPostTypes.includes( slug )
		);
		return filteredPostTypes;
	}, [] );

	const postTypesSelectOptions = useMemo(
		() =>
			( postTypes || [] ).map( ( { labels, slug } ) => ( {
				label: labels.singular_name,
				value: slug,
			} ) ),
		[ postTypes ]
	);

	return { postTypesSelectOptions };
};

export const usePostTypeForPosts = ( postType, numberOfPosts ) => {
	const selectedPosts = useSelect( ( select ) => {
		return select( 'core' ).getEntityRecords( 'postType', postType, {
			per_page: parseInt( numberOfPosts ),
		} );
	} );

	const selectedPostsMetaKeys = useMemo( () => {
		const availableMetaKeys = [];

		( selectedPosts || [] ).forEach( ( selectedPost ) => {
			if ( selectedPost.meta ) {
				Object.keys( selectedPost.meta ).forEach( ( metaKey ) => {
					const matchingMetaKey = availableMetaKeys.find(
						( availableMetaKey ) => {
							return availableMetaKey === metaKey;
						}
					);

					if ( matchingMetaKey === undefined ) {
						availableMetaKeys.push( metaKey );
					}
				} );
			}
		} );

		return availableMetaKeys;
	}, [ selectedPosts ] );

	return { selectedPostsMetaKeys };
};
