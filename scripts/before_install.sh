echo $HOME
echo $NODE_ENV
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
echo $NVM_DIR
env
ls /home/ubuntu/.nvm

# Check if aws cli is not installed
if ! command -v aws &> /dev/null; then
    # Update package manager and install aws cli
    if command -v apt-get &> /dev/null; then
        sudo apt-get update
        sudo apt-get install -y awscli
    else
        echo "Error: Unsupported package manager. Please install AWS CLI manually."
        exit 1
    fi
fi

# Check if jq is not installed
if ! command -v jq &> /dev/null; then
      # Install jq
    if command -v apt-get &> /dev/null; then
         sudo apt-get update
         sudo apt-get install -y jq
    else
        echo "Error: Unsupported package manager. Please install jq manually."
        exit 1
    fi
fi
