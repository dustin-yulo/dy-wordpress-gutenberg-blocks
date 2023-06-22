(()=>{"use strict";var e,t={761:()=>{const e=window.wp.blocks,t=window.wp.i18n,s=JSON.parse('{"u2":"dy-wordpress-gutenberg-blocks/post-carousel"}'),l=window.wp.element,a=window.wp.blockEditor,o=window.wp.components,r=window.wp.data,n=window.wp.url,i=e=>{let{selectedPosts:s,slidesToShow:a,slidesToScroll:o,slideAutoplay:r,slideSpeed:i,slideDuration:c,pauseOnHover:p,infiniteScroll:d,postDisplayFeaturedImage:u,postDisplayPostMetaAsImage:m,postDisplayPostMetaKey:g,postDisplayPostTitle:y,postMeta:b,postMetaSeparator:w}=e;const _=(0,l.useRef)(null),E=(0,l.useRef)(null),h=(0,l.useRef)(null),v=(0,l.useRef)(null);return(0,l.useEffect)((()=>{const e={allowTouchMove:!1,loop:d,slidesPerGroup:o,slidesPerView:a,spaceBetween:50,speed:i,navigation:{nextEl:E.current,prevEl:h.current},pagination:{clickable:!0,el:v.current},...!1!==r?{autoplay:{delay:c,disableOnInteraction:!1,pauseOnMouseEnter:p}}:{}};Object.assign(_.current,e),_.current.initialize()}),[s,a,o,r,i,c,p,d,u,m,g,y,b,w]),(0,l.createElement)(l.Fragment,null,(0,l.createElement)("swiper-container",{ref:_,init:"false",class:"dy-wordpress-gutenberg-blocks-post-carousel dy-post-list"},s&&s.length>0&&s.map((e=>{const t=e._embedded&&e._embedded["wp:featuredmedia"]&&e._embedded["wp:featuredmedia"].length>0&&e._embedded["wp:featuredmedia"][0],s=e.meta&&e.meta[g];return(0,l.createElement)("swiper-slide",{key:e.id,id:"post-"+e.id,class:"dy-post-list-item"},(0,l.createElement)("a",{href:e.link,className:"dy-post-list-item-link"},u&&t&&(0,l.createElement)("div",{className:"dy-post-list-item-image"},(0,l.createElement)("img",{className:"dy-post-featured-image",src:t.source_url,alt:t.alt_text})),m&&s&&(0,n.isURL)(s)&&(0,l.createElement)("div",{className:"dy-post-list-item-image"},(0,l.createElement)("img",{className:"dy-post-meta-image",src:(0,n.prependHTTP)(s),alt:""})),e.meta&&Object.keys(e.meta).length>0&&b&&b.length>0&&(0,l.createElement)("p",{className:"dy-post-meta"},b.map(((t,s)=>{const a=e.meta[t];return a?(0,l.createElement)(l.Fragment,null,a,s!==b.length-1&&(0,l.createElement)("span",{className:"dy-post-meta-separator"}," "+w+" ")):null}))),y&&(0,l.createElement)("p",{className:"dy-post-title"},(0,l.createElement)(l.RawHTML,null,e.title.rendered))))}))),(0,l.createElement)("div",{className:"swiper-custom-slider-controls-container"},(0,l.createElement)("div",{className:"swiper-custom-navigation-button button-prev",ref:h},(0,l.createElement)("div",{className:"swiper-custom-navigation-button-icon"},(0,l.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},(0,l.createElement)("path",{d:"M177.5 414c-8.8 3.8-19 2-26-4.6l-144-136C2.7 268.9 0 262.6 0 256s2.7-12.9 7.5-17.4l144-136c7-6.6 17.2-8.4 26-4.6s14.5 12.5 14.5 22l0 72 288 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l-288 0 0 72c0 9.6-5.7 18.2-14.5 22z"}))),(0,l.createElement)("div",{className:"swiper-custom-navigation-button-text"},(0,t.__)("Previous","dy-wordpress-gutenberg-blocks"))),(0,l.createElement)("div",{className:"swiper-custom-pagination-container",ref:v}),(0,l.createElement)("div",{className:"swiper-custom-navigation-button button-next",ref:E},(0,l.createElement)("div",{className:"swiper-custom-navigation-button-text"},(0,t.__)("Next","dy-wordpress-gutenberg-blocks")),(0,l.createElement)("div",{className:"swiper-custom-navigation-button-icon"},(0,l.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},(0,l.createElement)("path",{d:"M334.5 414c8.8 3.8 19 2 26-4.6l144-136c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22l0 72L32 192c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32l288 0 0 72c0 9.6 5.7 18.2 14.5 22z"}))))))};(0,e.registerBlockType)(s.u2,{styles:[{name:"dy-post-carousel-style-1",label:(0,t.__)("Style 1","dy-wordpress-gutenberg-blocks"),isDefault:!0}],edit:function(e){let{attributes:s,setAttributes:n}=e;const{slidesToShow:c,slidesToScroll:p,slideAutoplay:d,slideSpeed:u,slideDuration:m,pauseOnHover:g,infiniteScroll:y,postDisplayFeaturedImage:b,postDisplayPostMetaAsImage:w,postDisplayPostMetaKey:_,postDisplayPostTitle:E,postMeta:h,postMetaSeparator:v,querySource:f,queryOrder:k,queryOrderBy:N,queryNumberOfItems:P}=s,{postTypesSelectOptions:S}=(()=>{const e=(0,r.useSelect)((e=>{const{getPostTypes:t}=e("core"),s=["attachment"],l=t({per_page:-1})?.filter((e=>{let{viewable:t,slug:l}=e;return t&&!s.includes(l)}));return l}),[]);return{postTypesSelectOptions:(0,l.useMemo)((()=>(e||[]).map((e=>{let{labels:t,slug:s}=e;return{label:t.singular_name,value:s}}))),[e])}})(),{selectedPosts:C,selectedPostsMetaKeys:O,selectedPostsMetaKeysSelectOptions:T}=((e,t,s,a)=>{const o=(0,r.useSelect)((l=>l("core").getEntityRecords("postType",e,{per_page:parseInt(a),_embed:!0,order:t,orderby:s}))),n=(0,l.useMemo)((()=>{const e=[];return(o||[]).forEach((t=>{t.meta&&Object.keys(t.meta).forEach((t=>{void 0===e.find((e=>e===t))&&e.push(t)}))})),e}),[o]),i=(0,l.useMemo)((()=>(n||[]).map((e=>({label:e,value:e})))),[n]);return{selectedPosts:o,selectedPostsMetaKeys:n,selectedPostsMetaKeysSelectOptions:i}})(f,k,N,P);return(0,l.createElement)(l.Fragment,null,(0,l.createElement)("div",(0,a.useBlockProps)(),(0,l.createElement)(i,{selectedPosts:C,slidesToShow:c,slidesToScroll:p,slideAutoplay:d,slideSpeed:u,slideDuration:m,pauseOnHover:g,infiniteScroll:y,postDisplayFeaturedImage:b,postDisplayPostMetaAsImage:w,postDisplayPostMetaKey:_,postDisplayPostTitle:E,postMeta:h,postMetaSeparator:v})),(0,l.createElement)(a.InspectorControls,null,(0,l.createElement)("div",{className:"dy-wordpress-gutenberg-blocks-post-carousel-inspector-controls"},(0,l.createElement)(o.PanelBody,{className:"carousel-settings",title:(0,t.__)("Carousel settings","dy-wordpress-gutenberg-blocks")},(0,l.createElement)(o.PanelRow,{className:"slides-to-show"},(0,l.createElement)("label",{htmlFor:"carousel-settings__slides-to-show"},(0,t.__)("Slides to show","dy-wordpress-gutenberg-blocks")),(0,l.createElement)(o.__experimentalNumberControl,{id:"carousel-settings__slides-to-show",className:"input-field input-type-number",value:c,onChange:e=>{const t=e?parseFloat(e):1;n({slidesToShow:t})},isDragEnabled:!1,min:1,step:"any",required:!0})),(0,l.createElement)(o.PanelRow,{className:"slides-to-scroll"},(0,l.createElement)("label",{htmlFor:"carousel-settings__slides-to-scroll"},(0,t.__)("Slides to scroll","dy-wordpress-gutenberg-blocks")),(0,l.createElement)(o.__experimentalNumberControl,{id:"carousel-settings__slides-to-scroll",className:"input-field input-type-number",value:p,onChange:e=>{const t=e?parseInt(e):1;n({slidesToScroll:t})},isDragEnabled:!1,min:1,required:!0})),(0,l.createElement)(o.PanelRow,{className:"slide-speed"},(0,l.createElement)("label",{htmlFor:"carousel-settings__slide-speed"},(0,t.__)("Slide speed (ms)","dy-wordpress-gutenberg-blocks")),(0,l.createElement)(o.__experimentalNumberControl,{id:"carousel-settings__slide-speed",className:"input-field input-type-number",value:u,onChange:e=>{const t=e?parseInt(e):1;n({slideSpeed:t})},isDragEnabled:!1,min:1,required:!0})),(0,l.createElement)(o.PanelRow,{className:"infinite-carousel-scroll"},(0,l.createElement)(o.ToggleControl,{id:"carousel-settings__infinite-carousel-scroll",className:"input-field input-type-checkbox toggle-control-row",label:(0,t.__)("Infinite scroll","dy-wordpress-gutenberg-blocks"),checked:y,onChange:e=>{n({infiniteScroll:e})}})),(0,l.createElement)(o.PanelRow,{className:"slide-autoplay"},(0,l.createElement)(o.ToggleControl,{id:"carousel-settings__slide-autoplay",className:"input-field input-type-checkbox toggle-control-row",label:(0,t.__)("Autoplay","dy-wordpress-gutenberg-blocks"),checked:d,onChange:e=>{n({slideAutoplay:e})}})),d&&!1!==d&&(0,l.createElement)(l.Fragment,null,(0,l.createElement)(o.PanelRow,{className:"slide-duration"},(0,l.createElement)("label",{htmlFor:"carousel-settings__slide-duration"},(0,t.__)("Slide duration (ms)","dy-wordpress-gutenberg-blocks")),(0,l.createElement)(o.__experimentalNumberControl,{id:"carousel-settings__slide-duration",className:"input-field input-type-number",value:m,onChange:e=>{const t=e?parseInt(e):1;n({slideDuration:t})},isDragEnabled:!1,min:1,required:!0})),(0,l.createElement)(o.PanelRow,{className:"pause-carousel-on-hover"},(0,l.createElement)(o.ToggleControl,{id:"carousel-settings__pause-carousel-on-hover",className:"input-field input-type-checkbox toggle-control-row",label:(0,t.__)("Pause carousel on hover","dy-wordpress-gutenberg-blocks"),checked:g,onChange:e=>{n({pauseOnHover:e})}})))),(0,l.createElement)(o.PanelBody,{className:"carousel-post-settings",title:(0,t.__)("Post settings","dy-wordpress-gutenberg-blocks")},(0,l.createElement)(o.PanelRow,{className:"display-featured-image"},(0,l.createElement)(o.ToggleControl,{id:"carousel-settings__display-featured-image",className:"input-field input-type-checkbox toggle-control-row",label:(0,t.__)("Display featured image","dy-wordpress-gutenberg-blocks"),checked:b,onChange:e=>{n({postDisplayFeaturedImage:e,postDisplayPostMetaAsImage:!0===e&&!1})}})),O.length>0&&(0,l.createElement)(l.Fragment,null,(0,l.createElement)(o.PanelRow,{className:"display-post-meta-image"},(0,l.createElement)(o.ToggleControl,{id:"carousel-settings__display-post-meta-image",className:"input-field input-type-checkbox toggle-control-row",label:(0,t.__)("Display post meta as image","dy-wordpress-gutenberg-blocks"),checked:w,onChange:e=>{n({postDisplayPostMetaAsImage:e,postDisplayFeaturedImage:!0===e&&!1})}})),w&&(0,l.createElement)(o.PanelRow,{className:"display-post-meta-image__post-meta select-row"},(0,l.createElement)(o.SelectControl,{label:(0,t.__)("Post meta with image URL","dy-wordpress-gutenberg-blocks"),value:_,onChange:e=>{n({postDisplayPostMetaKey:e})},options:T}))),(0,l.createElement)(o.PanelRow,{className:"display-post-title"},(0,l.createElement)(o.ToggleControl,{id:"carousel-settings__post-title",className:"input-field input-type-checkbox toggle-control-row",label:(0,t.__)("Display post title","dy-wordpress-gutenberg-blocks"),checked:E,onChange:e=>{n({postDisplayPostTitle:e})}})),O.length>0&&(0,l.createElement)(l.Fragment,null,(0,l.createElement)(o.PanelRow,{className:"post-meta"},(0,l.createElement)(o.FormTokenField,{label:(0,t.__)("Post meta","dy-wordpress-gutenberg-blocks"),value:h,onChange:e=>{n({postMeta:e})},suggestions:O,__experimentalExpandOnFocus:!0,__experimentalShowHowTo:!1})),(0,l.createElement)(o.PanelRow,{className:"post-meta-separator"},(0,l.createElement)("label",{htmlFor:"carousel-post-settings__post-meta-separator"},(0,t.__)("Post meta separator","dy-wordpress-gutenberg-blocks")),(0,l.createElement)(o.TextControl,{id:"carousel-post-settings__post-meta-separator",className:"input-field input-type-text-short",value:v,onChange:e=>{n({postMetaSeparator:e})}})))),(0,l.createElement)(o.PanelBody,{className:"carousel-query-settings",title:(0,t.__)("Query","dy-wordpress-gutenberg-blocks")},(0,l.createElement)(o.SelectControl,{label:(0,t.__)("Source","dy-wordpress-gutenberg-blocks"),value:f,onChange:e=>{n({querySource:e,postMeta:[]})},options:S}),(0,l.createElement)(o.QueryControls,{order:k,onOrderChange:e=>{n({queryOrder:e})},orderBy:N,onOrderByChange:e=>{n({queryOrderBy:e})},numberOfItems:P,onNumberOfItemsChange:e=>{n({queryNumberOfItems:e})}})))))},save:()=>{}})}},s={};function l(e){var a=s[e];if(void 0!==a)return a.exports;var o=s[e]={exports:{}};return t[e](o,o.exports,l),o.exports}l.m=t,e=[],l.O=(t,s,a,o)=>{if(!s){var r=1/0;for(p=0;p<e.length;p++){for(var[s,a,o]=e[p],n=!0,i=0;i<s.length;i++)(!1&o||r>=o)&&Object.keys(l.O).every((e=>l.O[e](s[i])))?s.splice(i--,1):(n=!1,o<r&&(r=o));if(n){e.splice(p--,1);var c=a();void 0!==c&&(t=c)}}return t}o=o||0;for(var p=e.length;p>0&&e[p-1][2]>o;p--)e[p]=e[p-1];e[p]=[s,a,o]},l.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={344:0,602:0};l.O.j=t=>0===e[t];var t=(t,s)=>{var a,o,[r,n,i]=s,c=0;if(r.some((t=>0!==e[t]))){for(a in n)l.o(n,a)&&(l.m[a]=n[a]);if(i)var p=i(l)}for(t&&t(s);c<r.length;c++)o=r[c],l.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return l.O(p)},s=globalThis.webpackChunkdy_wordpress_gutenberg_blocks=globalThis.webpackChunkdy_wordpress_gutenberg_blocks||[];s.forEach(t.bind(null,0)),s.push=t.bind(null,s.push.bind(s))})();var a=l.O(void 0,[602],(()=>l(761)));a=l.O(a)})();