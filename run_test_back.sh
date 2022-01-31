#!/bin/bash

# docker-compose -f docker-compose.test.yml build

docker-compose -f docker-compose.test.yml run --rm back_test && \
    docker-compose -f docker-compose.test.yml down