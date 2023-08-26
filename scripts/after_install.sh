export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
cd /home/ubuntu/lender-backend
echo "installing yarn"
npm install -g yarn
echo "installing node modules"
yarn install
echo "creating build"
yarn run build
