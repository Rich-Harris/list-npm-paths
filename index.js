module.exports = lnp;

function lnp () {
	throw new Error( 'list-bower-paths does not work asynchronously - use require(\'list-bower-paths\').sync instead' );
}

lnp.sync = function ( options ) {
	var path = require( 'path' ),
		findup = require( 'findup-sync' ),
		relative = require( 'require-relative' ),
		projectRoot,
		nodeModules,
		pkgFile,
		pkg,
		deps,
		mod,
		result = {};

	options = options || {};

	pkgFile = findup( 'package.json', { cwd: options.cwd || process.cwd() });
	projectRoot = path.dirname( pkgFile );
	nodeModules = path.join( projectRoot, 'node_modules' );

	if ( !pkgFile ) {
		throw new Error( 'Could not find a package.json' );
	}

	pkg = require( pkgFile );
	deps = pkg.dependencies;

	for ( mod in deps ) {
		if ( deps.hasOwnProperty( mod ) ) {
			result[ mod ] = find( mod );
		}
	}

	return result;

	function find ( mod ) {
		var modPkg, main;

		try {
			modPkg = require( path.join( nodeModules, mod, 'package.json' ) );
		} catch ( err ) {
			throw new Error( 'Could not find package.json for ' + mod + '. Is it installed?' );
		}

		main = path.join( mod, modPkg.main || 'index.js' );

		if ( options.absolute ) {
			main = path.join( nodeModules, main );
		}

		if ( !options.ext ) {
			main = main.replace( /\.js$/, '' );
		}

		return main;
	}
};


