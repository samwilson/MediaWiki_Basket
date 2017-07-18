<?php

namespace Basket;

use OutputPage;
use Skin;

/**
 * Hooks for Basket extension
 *
 * @file
 * @ingroup Extensions
 */

class Hooks {

	public static function onBeforePageDisplay( OutputPage &$out, Skin &$skin ) {
		$out->addModules( 'ext.Basket' );
	}

}
