import Alt from 'alt';

// Create alt instance.
const alt = new Alt();

// Debug dispatcher.
alt.dispatcher.register(console.log.bind(console));

export default alt;