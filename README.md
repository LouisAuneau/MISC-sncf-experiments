# SNCF disruptions visualization

This personal project aims to visualize disruptions on french railway network, using open data provided by SNCF.
Technology used are JS and ElasticSearch.

## Setup

The project requires node version > 10.0.

```
npm install
npm install -g typescript
```

Compile the project :
```
tsc
```

Set you `env.json` file using `env.example.json` template. And setup your elasticsearch cluster with :
```
node dist/src/setup.js
```

Then run to import disruptions from the day set in env.json :
```
node dist/src/import.js
```

## Todo

- [x] Loop through SNCF disruptions.
- [x] Create ElasticSearch mapping.
- [x] Insert disruptions in ElasticSearch.
- [x] Create environment file.
- [ ] Visualize in Kibana.
- [ ] Fix bug with delay overlapping two days.
- [ ] Fix bug with undefined `base_departure_time`.