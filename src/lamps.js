function now() {
    return new Date().getTime()
  }
  
  const _ = require('lodash')
  
  module.exports = function lampsPlugin() {
    const loopin = this
    const config = {
      output: {
        fadecandy: {
          path: "../fadecandy"
        }
      }
    }
  
    var last = now()
  
    let encoding = 'hex'
  
    loopin.patch( {
      format: encoding,
      input: 'none',
      output: 'always',
      buffer: 'paint',
      channels: 'rgb',
    }, 'pixels/paint' )
  
  
    const Blitface = require('blitface')
    const blitface = new Blitface( config )
    blitface.open()
  
    var buf 
  
    loopin.dispatchListen( 'pixels', ( event ) => {
      let time = now()
      let delta = time - last
      last = time 
      buf = null
  
      if ( !buf )
        buf = Buffer.from( event.data.data, encoding )
      else
        buf.write( event.data.data, 0, encoding )
      blitface.blit( buf )
      // let data = Buffer.from( event.data.data, 'base64' )
      // // console.log( { data })
      // blitface.blit( data )
  
      return true
    })
  
  }