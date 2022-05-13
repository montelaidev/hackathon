#!/bin/bash
set -e

ENVIRONMENT=$(terraform workspace show);
echo $ENVIRONMENT

echo "Enter Profile: "

read PROFILE



terraform validate

terraform plan -var-file="./tfvar/${ENVIRONMENT}.tfvars" \
 -var="profile=$PROFILE" \
 -out="plan/${ENVIRONMENT}.plan"

echo "Confirm to process, (Y)es or (N)o?"
read CONFIRM

if [[ $CONFIRM == "Y" ]] || [[ $CONFIRM == "y" ]]
then
  terraform apply "plan/${ENVIRONMENT}.plan"
  rm -rf "plan/${ENVIRONMENT}.plan"
  exit 0;
else
  echo "Aborted.";
  rm -rf "plan/${ENVIRONMENT}.plan"
  clear;
  exit 0;
fi
