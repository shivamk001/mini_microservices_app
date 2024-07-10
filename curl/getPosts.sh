#!/bin/bash

url="http://192.168.49.2:31834/posts"

response=$(curl $url)

#print the response
echo "$response"