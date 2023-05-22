(()=>{"use strict";var e,t={549:()=>{const e=window.wp.blocks,t=window.wp.i18n,s=JSON.parse('{"u2":"dy-wordpress-gutenberg-blocks/post-carousel"}'),r=window.wp.element,l=window.wp.blockEditor,o=window.wp.components,a=window.wp.data;(0,e.registerBlockType)(s.u2,{styles:[{name:"dy-post-carousel-style-1",label:(0,t.__)("Style 1","dy-wordpress-gutenberg-blocks"),isDefault:!0}],edit:function(e){let{attributes:s,setAttributes:n}=e;const{slidesToShow:c,slidesToScroll:i,autoplay:u,slideSpeed:d,slideDuration:p,pauseOnHover:g,infiniteScroll:m,postDisplayFeaturedImage:b,postDisplayPostTitle:_,postMeta:y,postMetaSeparator:w,querySource:h,queryOrder:E,queryOrderBy:k,queryNumberOfItems:f}=s,{postTypesSelectOptions:v}=(()=>{const e=(0,a.useSelect)((e=>{const{getPostTypes:t}=e("core"),s=["attachment"],r=t({per_page:-1})?.filter((e=>{let{viewable:t,slug:r}=e;return t&&!s.includes(r)}));return r}),[]);return{postTypesSelectOptions:(0,r.useMemo)((()=>(e||[]).map((e=>{let{labels:t,slug:s}=e;return{label:t.singular_name,value:s}}))),[e])}})(),{selectedPostsMetaKeys:C}=((e,t)=>{const s=(0,a.useSelect)((s=>s("core").getEntityRecords("postType",e,{per_page:parseInt(t)})));return{selectedPostsMetaKeys:(0,r.useMemo)((()=>{const e=[];return(s||[]).forEach((t=>{t.meta&&Object.keys(t.meta).forEach((t=>{void 0===e.find((e=>e===t))&&e.push(t)}))})),e}),[s])}})(h,f);return(0,r.createElement)(r.Fragment,null,(0,r.createElement)("div",(0,l.useBlockProps)(),(0,t.__)("DYPostCarouselEdit","dy-wordpress-gutenberg-blocks")),(0,r.createElement)(l.InspectorControls,null,(0,r.createElement)("div",{className:"dy-wordpress-gutenberg-blocks-post-carousel-inspector-controls"},(0,r.createElement)(o.PanelBody,{className:"carousel-settings",title:(0,t.__)("Carousel settings","dy-wordpress-gutenberg-blocks")},(0,r.createElement)(o.PanelRow,{className:"slides-to-show"},(0,r.createElement)("label",{htmlFor:"carousel-settings__slides-to-show"},(0,t.__)("Slides to show","dy-wordpress-gutenberg-blocks")),(0,r.createElement)(o.__experimentalNumberControl,{id:"carousel-settings__slides-to-show",className:"input-field input-type-number",value:c,onChange:e=>{const t=e?parseInt(e):1;n({slidesToShow:t})},isDragEnabled:!1,min:1,required:!0})),(0,r.createElement)(o.PanelRow,{className:"slides-to-scroll"},(0,r.createElement)("label",{htmlFor:"carousel-settings__slides-to-scroll"},(0,t.__)("Slides to scroll","dy-wordpress-gutenberg-blocks")),(0,r.createElement)(o.__experimentalNumberControl,{id:"carousel-settings__slides-to-scroll",className:"input-field input-type-number",value:i,onChange:e=>{const t=e?parseInt(e):1;n({slidesToScroll:t})},isDragEnabled:!1,min:1,required:!0})),(0,r.createElement)(o.PanelRow,{className:"autoplay"},(0,r.createElement)(o.ToggleControl,{id:"carousel-settings__autoplay",className:"input-field input-type-checkbox toggle-control-row",label:(0,t.__)("Autoplay","dy-wordpress-gutenberg-blocks"),checked:u,onChange:e=>{n({autoplay:e})}})),(0,r.createElement)(o.PanelRow,{className:"slide-speed"},(0,r.createElement)("label",{htmlFor:"carousel-settings__slide-speed"},(0,t.__)("Slide speed (ms)","dy-wordpress-gutenberg-blocks")),(0,r.createElement)(o.__experimentalNumberControl,{id:"carousel-settings__slide-speed",className:"input-field input-type-number",value:d,onChange:e=>{const t=e?parseInt(e):1;n({slideSpeed:t})},isDragEnabled:!1,min:1,required:!0})),(0,r.createElement)(o.PanelRow,{className:"slide-duration"},(0,r.createElement)("label",{htmlFor:"carousel-settings__slide-duration"},(0,t.__)("Slide duration (ms)","dy-wordpress-gutenberg-blocks")),(0,r.createElement)(o.__experimentalNumberControl,{id:"carousel-settings__slide-duration",className:"input-field input-type-number",value:p,onChange:e=>{const t=e?parseInt(e):1;n({slideDuration:t})},isDragEnabled:!1,min:1,required:!0})),(0,r.createElement)(o.PanelRow,{className:"pause-carousel-on-hover"},(0,r.createElement)(o.ToggleControl,{id:"carousel-settings__pause-carousel-on-hover",className:"input-field input-type-checkbox toggle-control-row",label:(0,t.__)("Pause carousel on hover","dy-wordpress-gutenberg-blocks"),checked:g,onChange:e=>{n({pauseOnHover:e})}})),(0,r.createElement)(o.PanelRow,{className:"infinite-carousel-scroll"},(0,r.createElement)(o.ToggleControl,{id:"carousel-settings__infinite-carousel-scroll",className:"input-field input-type-checkbox toggle-control-row",label:(0,t.__)("Infinite scroll","dy-wordpress-gutenberg-blocks"),checked:m,onChange:e=>{n({infiniteScroll:e})}}))),(0,r.createElement)(o.PanelBody,{className:"carousel-post-settings",title:(0,t.__)("Post settings","dy-wordpress-gutenberg-blocks")},(0,r.createElement)(o.PanelRow,{className:"display-featured-image"},(0,r.createElement)(o.ToggleControl,{id:"carousel-settings__display-featured-image",className:"input-field input-type-checkbox toggle-control-row",label:(0,t.__)("Display featured image","dy-wordpress-gutenberg-blocks"),checked:b,onChange:e=>{n({postDisplayFeaturedImage:e})}})),(0,r.createElement)(o.PanelRow,{className:"display-post-title"},(0,r.createElement)(o.ToggleControl,{id:"carousel-settings__post-title",className:"input-field input-type-checkbox toggle-control-row",label:(0,t.__)("Display post title","dy-wordpress-gutenberg-blocks"),checked:_,onChange:e=>{n({postDisplayPostTitle:e})}})),C.length>0&&(0,r.createElement)(r.Fragment,null,(0,r.createElement)(o.PanelRow,{className:"post-meta"},(0,r.createElement)(o.FormTokenField,{label:(0,t.__)("Post meta","dy-wordpress-gutenberg-blocks"),value:y,onChange:e=>{n({postMeta:e})},suggestions:C,__experimentalExpandOnFocus:!0,__experimentalShowHowTo:!1})),(0,r.createElement)(o.PanelRow,{className:"post-meta-separator"},(0,r.createElement)("label",{htmlFor:"carousel-post-settings__post-meta-separator"},(0,t.__)("Post meta separator","dy-wordpress-gutenberg-blocks")),(0,r.createElement)(o.TextControl,{id:"carousel-post-settings__post-meta-separator",className:"input-field input-type-text-short",value:w,onChange:e=>{n({postMetaSeparator:e})}})))),(0,r.createElement)(o.PanelBody,{className:"carousel-query-settings",title:(0,t.__)("Query","dy-wordpress-gutenberg-blocks")},(0,r.createElement)(o.SelectControl,{label:(0,t.__)("Source","dy-wordpress-gutenberg-blocks"),value:h,onChange:e=>{n({querySource:e,postMeta:[]})},options:v}),(0,r.createElement)(o.QueryControls,{order:E,onOrderChange:e=>{n({queryOrder:e})},orderBy:k,onOrderByChange:e=>{n({queryOrderBy:e})},numberOfItems:f,onNumberOfItemsChange:e=>{n({queryNumberOfItems:e})}})))))},save:function(){return(0,r.createElement)("div",l.useBlockProps.save(),(0,t.__)("DYPostCarouselSave","dy-wordpress-gutenberg-blocks"))}})}},s={};function r(e){var l=s[e];if(void 0!==l)return l.exports;var o=s[e]={exports:{}};return t[e](o,o.exports,r),o.exports}r.m=t,e=[],r.O=(t,s,l,o)=>{if(!s){var a=1/0;for(u=0;u<e.length;u++){for(var[s,l,o]=e[u],n=!0,c=0;c<s.length;c++)(!1&o||a>=o)&&Object.keys(r.O).every((e=>r.O[e](s[c])))?s.splice(c--,1):(n=!1,o<a&&(a=o));if(n){e.splice(u--,1);var i=l();void 0!==i&&(t=i)}}return t}o=o||0;for(var u=e.length;u>0&&e[u-1][2]>o;u--)e[u]=e[u-1];e[u]=[s,l,o]},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={344:0,602:0};r.O.j=t=>0===e[t];var t=(t,s)=>{var l,o,[a,n,c]=s,i=0;if(a.some((t=>0!==e[t]))){for(l in n)r.o(n,l)&&(r.m[l]=n[l]);if(c)var u=c(r)}for(t&&t(s);i<a.length;i++)o=a[i],r.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return r.O(u)},s=globalThis.webpackChunkdy_wordpress_gutenberg_blocks=globalThis.webpackChunkdy_wordpress_gutenberg_blocks||[];s.forEach(t.bind(null,0)),s.push=t.bind(null,s.push.bind(s))})();var l=r.O(void 0,[602],(()=>r(549)));l=r.O(l)})();