import { __ } from '@wordpress/i18n'
import { useBlockProps } from '@wordpress/block-editor'
import { InputWrap } from '../../components/InputWrap'
import { inputTypeConditionals } from './input-type-conditionals'

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save( { attributes } ) {

	const {
		label,
		labelIsHidden,
		name,
		labelID,
		type,
		required,
		autocomplete,
		placeholder,
	} = attributes

	const blockProps = useBlockProps.save()

	// Set the HTML tag to either input or textarea.
	const InputTagName = ( type === 'textarea' ) ? 'textarea' : 'input'

	/*
	 * Get valid conditional properties for this input type, then get any corresponding saved values
	 * and filter the required block props.
	 */
	const conditionalProps = {}
	const conditionals     = inputTypeConditionals[ type ]
	conditionals.forEach( attr => {
		if ( attributes[ attr ] ) {
			switch ( attr ) {
				case 'rows':
				case 'step':
					conditionalProps[ attr ] = attributes[ attr ]
					break

				default:
					// We don't need that attribute.
			}
		}
	} )
	// Add the type attr only if it's not a textarea.
	if ( type !== 'textarea' ) conditionalProps.type = type

	return (

		<>
			<div { ...blockProps }>
				{ label && ! labelIsHidden &&
					<label
						htmlFor={ labelID }
						className="bigup__form_inputLabel"
					>
						{ label }
					</label>
				}
				<InputWrap>
					<InputTagName
						name={ name }
						className={ 'bigup__form_input' }
						id={ labelID }
						title={ label }
						aria-label={ label }
						placeholder={ placeholder }
						onFocus={ ( e ) => { e.target.placeholder = '' } }
						onBlur={ ( e ) => { e.target.placeholder = placeholder } }
						autoComplete={ autocomplete }
						{ ...conditionalProps }
						required={ required }
					/>
				</InputWrap>
			</div>
		</>
	)
}
