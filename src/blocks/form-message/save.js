import { __ } from '@wordpress/i18n'
import { useBlockProps } from '@wordpress/block-editor'
import { InputWrapper } from '../../components/InputWrapper'

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save() {

	const blockProps = useBlockProps.save( {
		className: 'bigup__form_input'
	} )

	return (
		<InputWrapper>
			<textarea
				{ ...blockProps }
				name='message'
				maxlength='5000'
				title='Message'
				rows='8'
				aria-label='Message'
				placeholder='Type your message here...'
				onfocus='this.placeholder=""'
				onblur='this.placeholder="Type your message..."'
			>
			</textarea>
		</InputWrapper>
	)
}