#!/bin/bash
aws --profile talgiat $1 --exclude=aws_sync* --exclude=node_modules/* --exclude=.git* --exclude=package.json --exclude=index_* --exclude=.DS_Store s3 --exclude=*.txt --cache-control=no-cache sync . s3://anokhee-tal-wedding/