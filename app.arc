@app
begin-app

@static
folder build

@http
get /graphql
post /graphql

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
