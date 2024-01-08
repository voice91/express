export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
cd /opt/lender-backend
echo "installing yarn"
npm install -g yarn
echo "installing node modules"
yarn install

# Check the environment and set the secret ID accordingly
if [ "$APPLICATION_NAME" == "lender-staging" ]; then
    SECRET_ID="lender-staging"
elif [ "$APPLICATION_NAME" == "lender-production" ]; then
    SECRET_ID="lender-production"
elif [ "$APPLICATION_NAME" == "lender-sandbox" ]; then
    SECRET_ID="lender-sandbox"
else
    echo "Error: Unknown environment '$APPLICATION_NAME'. Exiting."
    exit 1
fi

# This will get .env or secrets from aws secret manger in json
secret=$(aws secretsmanager get-secret-value --secret-id "$SECRET_ID" --region us-east-1 --query SecretString --output text)
# Parse the JSON and write each key-value pair as "KEY=VALUE" into .env
echo $secret | jq -r 'to_entries|map("\(.key)=\(.value|@sh)")|.[]' > /opt/lender-backend/.env

echo "creating build"
yarn run build
