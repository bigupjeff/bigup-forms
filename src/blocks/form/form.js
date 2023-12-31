import { __ } from '@wordpress/i18n'
import { registerBlockType } from '@wordpress/blocks'
import { Logo } from './svg'
import './form.scss'
import Edit from './edit'
import save from './save'
import metadata from './block.json'

console.log( metadata.name + ' BLOCK LOADED' )
// RUN IN CONSOLE TO SEE REGISTERED BLOCKS: wp.blocks.getBlockTypes() 

/**
 * Register the block.
 */
registerBlockType( metadata.name, {
	...metadata,
	icon: Logo,
	styles: [
		{
			name: 'default',
			label: __( 'None' ),
			isDefault: true
		},
		{
			name: 'vanilla',
			label: __( 'Vanilla' )
		},
		{
			name: 'inset-dark',
			label: __( 'Inset Dark' )
		},
		{
			name: 'inset-light',
			label: __( 'Inset Light' )
		}
	],
	edit: Edit,
	save,
} )
