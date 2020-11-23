# newrelic-winston-enricher-repo

project to reproduce the [issue - discuss.newrelic.com](https://discuss.newrelic.com/t/newrelic-winston-enricher-doesnt-add-span-id-or-trace-id-info/122201)

Package: <https://github.com/newrelic/newrelic-winston-logenricher-node> `v1.0.0`

## Versions

```json
"@newrelic/winston-enricher": "^1.0.0",
"express": "^4.17.1",
"express-winston": "^4.0.5",
"morgan": "^1.10.0",
"newrelic": "^6.14.0",
"winston": "^3.3.3"
```

Steps:

```bash
npm install
npm start
```

In another terminal:

```bash
curl http://localhost:8080

curl http://localhost:8080/error
```

## Example output

`app.log`

```text
{"message":"all good","level":"info","timestamp":1606148224980,"entity.name":"c2c","entity.type":"SERVICE","hostname":"gp-4869.local","entity.guid":"MjU2NjcxMXxBUE18QVBQTElDQVRJT058Mjc1MTg3MDM"}
{"message":"my fatal error","level":"fatal","timestamp":1606148226599,"entity.name":"c2c","entity.type":"SERVICE","hostname":"gp-4869.local","entity.guid":"MjU2NjcxMXxBUE18QVBQTElDQVRJT058Mjc1MTg3MDM"}
```
