import Alt from 'alt'

// Create alt instance.
const alt = new Alt()

// Debug dispatcher.
if (process.env.NODE_ENV === 'development') {
  alt.dispatcher.register((dispatch) => {
    console.log(dispatch.action, dispatch.data)
  })
}

export default alt
