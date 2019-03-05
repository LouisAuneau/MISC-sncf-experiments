# SNCF disruptions visualization

This personal project aims to visualize disruptions on french railway network, using open data provided by SNCF.
Technology used are JS and ElasticSearch.

## Setup

The project requires node version > 10.0.

```
npm install
```

The run :
```
node import.js {YOUR_SNCF_TOKEN}
```

## Todo

- [x] Loop through SNCF disruptions.
- [ ] Create ElasticSearch mapping.
- [ ] Insert disruptions in ElasticSearch.
- [ ] Create environment file.
- [ ] Visualize in Kibana.