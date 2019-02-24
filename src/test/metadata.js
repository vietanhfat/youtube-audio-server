const yas = require('../streamer')

// Get metadata.
yas.get('HQmmM_qwG4k', (err, data) => {
  console.log('-'.repeat(80))
  console.log('GOT METADATA for HQmmM_qwG4k:', data || err)
})
