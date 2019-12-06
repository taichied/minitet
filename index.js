async function run() {
  require('loopin-base').open( __dirname )
  .then( ( loopin ) => {
    // Your JS here.
    loopin.plugin( require('./src/lamps'))
  } )
}

if ( module == require.main )
  run()
else 
  module.exports = run