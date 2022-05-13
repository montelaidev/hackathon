#!/bin/bash
echo "Enter Environment: "
read ENVIRONMENT_NAME

echo "Enter Profile: "
read PROFILE

# echo "Enter Bucket: "
# read BUCKET

# echo "Enter LockTable: "
# read LOCK

terraform init -backend=false

terraform init -reconfigure \
  -backend-config="profile=$PROFILE" \
#   -backend-config="bucket=$BUCKET" \
#   -backend-config="key=git.terraform.tfstate" \
  -backend-config="region=ap-southeast-1" \
#   -backend-config="dynamodb_table=$LOCK" \
#   -backend-config="encrypt=true" \
  -no-color

WS_COUNT=$(terraform workspace list | grep "$ENVIRONMENT_NAME" | wc -l | awk '{print $1}');

# Create workspace if not exists
if [[ $WS_COUNT == 0 ]]; then
  terraform workspace new "$ENVIRONMENT_NAME";
fi

terraform workspace select $ENVIRONMENT_NAME
