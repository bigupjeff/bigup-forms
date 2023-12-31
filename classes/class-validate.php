<?php
namespace BigupWeb\Forms;

/**
 * Validation methods.
 *
 * TLDR; Validation enforces a data format, sanitisation makes data safe for a process.
 *
 * - Validation should be performed immediately on user input either on the frontend, backend or
 *   or ideally both to make the process as easy as possible for the user.
 *     - Frontend for immediate feedback to the user.
 *     - Backend as a fallback for frontend errors and malicious input. If the user isn't malicious,
 *       they should never have to see the effect of slower backend rejections.
 * - Validation is specific to the data format we are expecting to receive i.e. postcode, phone
 *   number or the user's name.
 * - Sanitisation differs in that it happens right before the data is prcessed for use i.e saving to
 *   a database or outputting to the frontend. Sanitisation doesn't care what format the data is,
 *   only that it is made safe for it's intended use. Therefore we only sanitise user input
 *   server-side and the user doesn't need to be aware of this process.
 *
 * All validation methods return:
 *     PASS: true
 *     FAIL: Array of public-friendly error message strings indicating changes required.
 *
 * @package bigup-forms
 * @author Jefferson Real <me@jeffersonreal.uk>
 * @copyright Copyright (c) 2024, Jefferson Real
 * @license GPL2+
 * @link https://jeffersonreal.uk
 */
class Validate {

	/**
	 * Validate by Format
	 *
	 * Automatically selects the right method indicated by passed format. Helpful for writing
	 * dynamic functions.
	 */
	public static function by_format( $format, $data ) {
		switch ( $format ) {

			case 'alphanumeric':
				return self::alphanumeric( $data );

			case 'human_name':
				return self::human_name( $data );

			case 'email':
				return self::email( $data );

			case 'domain':
				return self::domain( $data );

			case 'port':
				return self::port( $data );

			case 'boolean':
				return self::boolean( $data );

			default:
				error_log( 'Bigup Forms: Unknown validation format "' . $format . '" passed with value' );
				return false;
		}
	}


	/**
	 * Validate alphanumeric text.
	 */
	public static function alphanumeric( $data ) {

		$word_chars         = preg_replace( '/[£]||[^- \p{L}\p{N}]/', '', $data );
		$no_uscore          = preg_replace( '/_/', '-', $word_chars );
		$single_hyphen      = preg_replace( '/--+/', '-', $no_uscore );
		$clean_alphanumeric = preg_replace( '/  +/', ' ', $single_hyphen );
		return $clean_alphanumeric;
	}


	/**
	 * Validate a human name.
	 */
	public static function human_name( $data ) {

		if ( strlen( $data ) > 2 && strlen( $data ) < 50 ) {
			return true;
		}

		$errors = [ __( '2-50 characters allowed.', 'bigup-forms' ) ];
		return $errors;
	}


	/**
	 * Validate an email address.
	 */
	public static function email( $data ) {

		if ( PHPMailer::validateAddress( $data ) ) {
			return true;
		}

		$errors = [ __( 'Not a valid email address.', 'bigup-forms' ) ];
		return $errors;
	}


	/**
	 * Validate a domain name.
	 */
	public static function domain( $domain ) {

		$ip = gethostbyname( $domain );
		$ip = filter_var( $ip, FILTER_VALIDATE_IP );

		if ( $domain == '' || $domain == null ) {
			return '';
		} elseif ( $ip ) {
			return $domain;
		} else {
			return 'INVALID DOMAIN';
		}
	}


	/**
	 * Validate a port number.
	 */
	public static function port( $port ) {
		$port = (int) $port;
		if ( is_int( $port )
			&& $port >= 1
			&& $port <= 65535 ) {
			return $port;
		} else {
			return '';
		}
	}


	/**
	 * Validate a boolean input.
	 *
	 * Check the input is a valid representation of either true or false.
	 */
	public static function checkbox( $checkbox ) {

		$bool_checkbox = (bool) $checkbox;
		$bool_checkbox = $bool_checkbox ? 1 : 0;
		return $bool_checkbox;
	}
}
