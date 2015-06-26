import Alt from 'alt';

// Create alt instance.
const alt = new Alt();

// Debug dispatcher.
if (process.env.NODE_ENV === 'development') {
  alt.dispatcher.register(console.log.bind(console));
}

export default alt;