#!/bin/bash
#anokhee-tal-wedding - real site
#wedding.anokheetal.com - staging site
echo "$1"
aws --profile talgiat $1 --exclude=.sass_cache/* --exclude=sass/* --exclude=aws_sync* --exclude=node_modules/* --exclude=.git* --exclude=package.json --exclude=.DS_Store --exclude=*.txt --cache-control=no-cache s3 sync . s3://anokhee-tal-wedding/