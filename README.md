# SNCF disruptions visualization

This personal project aims to visualize disruptions on french railway network, using open data provided by SNCF.
Technology used are JS and ElasticSearch.

## Setup

The project requires node version > 10.0.

```
npm install
```

Set you `env.json` file using `env.example.json` template.

The run :
```
node src/import.js
```

## Todo

- [x] Loop through SNCF disruptions.
- [ ] Create ElasticSearch mapping.
- [ ] Insert disruptions in ElasticSearch.
- [x] Create environment file.
- [ ] Visualize in Kibana.