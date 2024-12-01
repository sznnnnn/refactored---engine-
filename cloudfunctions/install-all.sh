#!/bin/bash

# 遍历所有云函数目录
for d in */ ; do
    cd "$d"
    echo "Installing dependencies for $d"
    npm install
    cd ..
done 