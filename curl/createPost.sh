#!/bin/bash

url="http://192.168.49.2:31834/posts"
title="title1"
response=$(curl -X POST -H {"Content-Type: application-json"} -d '{"title": "title2"}' $url)

#print the response
echo "$response"