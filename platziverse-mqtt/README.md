# platziverse-mqtt

## 'agent/connected'
```js
{
  agent: {
    uuid, // auto generar
    username, // definir por configuracion
    name, // definir por configuracion
    hostname, // obtener del sistema operatibo
    pid // obtener del proceso
  }
}
```

## 'agetn/disconnected'
``` js
{
  agent: {
    uuid
  }
}
```

## 'agent/message'
```js
{
  agent,
  metrics: [
    {
      type,
      value
    }
  ],
  timestamp // generar cuando creamos el mensaje
}
```