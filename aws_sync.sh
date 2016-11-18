#!/bin/bash
#anokhee-tal-wedding - real site
#wedding.anokheetal.com - staging site
aws --profile talgiat $1 \
    --exclude=.git* --exclude=.sass-cache/* --exclude=node_modules/* --exclude=old_css/* \
    --exclude=*.json --exclude=*.sh --exclude=*DS_Store --exclude=*.txt \
    --cache-control=no-cache s3 sync . s3://anokhee-tal-wedding/