<?php

if ( function_exists( 'wfLoadExtension' ) ) {
	wfLoadExtension( 'BulkCategoryChanges' );
	// Keep i18n globals so mergeMessageFileList.php doesn't break
	$wgMessagesDirs['BulkCategoryChanges'] = __DIR__ . '/i18n';
	$wgExtensionMessagesFiles['BulkCategoryChangesAlias'] = __DIR__ . '/BulkCategoryChanges.i18n.alias.php';
	wfWarn(
		'Deprecated PHP entry point used for BulkCategoryChanges extension. Please use wfLoadExtension ' .
		'instead, see https://www.mediawiki.org/wiki/Extension_registration for more details.'
	);
	return true;
} else {
	die( 'This version of the BulkCategoryChanges extension requires MediaWiki 1.25+' );
}
