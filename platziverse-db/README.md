# platziverse-db

## Usage

```js
  const setup = require('platziverse-db')

  setupDabase(config).then(db => {
    const {Agent, Metric} = db
  }).catch (err => console.error(err))
```