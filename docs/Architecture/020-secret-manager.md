# AWS Secret Manger 

## Overview
AWS Secrets Manager is a fully managed service that helps you protect access to your applications, services, and IT resources without the upfront investment and on-going maintenance costs of operating your infrastructure. With Secrets Manager, you can rotate, manage, and retrieve database credentials, API keys, and other secrets throughout their lifecycle.

## Key Features

- **Secure Storage:** Safely store sensitive information such as database credentials, API keys, and other secrets.

- **Centralized Management:** Centrally manage and organize secrets, making it easier to update or rotate credentials.

- **Automated Rotation:** Easily automate the rotation of credentials to enhance security and compliance.

- **Access Control:** Implement fine-grained access controls to define who can retrieve or modify secrets.

- **Integration with AWS Services:** Seamlessly integrate with other AWS services to enhance security across your cloud infrastructure.

- **Integration with AWS Secrets Manager:** Fetch secrets from AWS Secrets Manager based on the specified environment.

- **Environment Variable Setup:** Automatically create a `.env` file with the retrieved key-value pairs for easy integration with your applications.

## Prerequisites

Before using this script, make sure you have the following:

- An AWS account.
- AWS CLI installed and configured with the necessary permissions.
- `jq` installed for JSON parsing.
- Appropriate permissions to create and manage secrets.

### Usage

1. **Create a Secret:**
   Use the AWS Management Console or AWS CLI to create a new secret and define its key-value pairs.

2. **Retrieve Secrets:**
   Access secrets programmatically using the AWS SDKs, AWS CLI, or the AWS Management Console.

3. **Automate Rotation:**
   Enable automatic rotation of secrets to enhance security and compliance.

## Integration with Your Project

To integrate AWS Secrets Manager with your project:

1. **Check the environment and set the secret ID accordingly**
   ```bash
   if [ "$APPLICATION_NAME" == "application-name" ]; then
     SECRET_ID="secret-id"
   else
     echo "Error: Unknown environment '$APPLICATION_NAME'. Exiting."
     exit 1
   fi

2. **Install AWS CLI:**
   Ensure AWS CLI is installed in your environment.

   ```bash
   sudo apt-get install -y awscli

3. **Retrieve Secrets:**
   Use the AWS CLI to retrieve secrets in your deployment scripts or application code.

   ```bash
   aws secretsmanager get-secret-value --secret-id YOUR_SECRET_ID --region YOUR_REGION --output text
   
4. **Install jq:**
   ```bash
   sudo apt-get install -y jq

5. **Secrets Retrieval and Environment Configuration:**
    After retrieving secrets from AWS Secrets Manager, it's important to configure your application environment appropriately. The following line of code demonstrates how to parse the JSON-formatted secret and create a `.env` file with key-value pairs:
   
   ```bash
   echo $secret | jq -r 'to_entries|map("\(.key)=\(.value|@sh)")|.[]' > directory/.env

6. **Check Code to this file:**
    ```bash
    /scripts/after_install.sh
    ```

### Script Details

The script (`after_install.sh`) performs the following actions:

- Determines the AWS Secrets Manager secret ID based on the specified environment.
- Retrieves the secret value from AWS Secrets Manager.
- Parses the JSON and creates a `.env` file with key-value pairs.


## Security Considerations

- **AWS Credentials:** Ensure that AWS CLI is configured with the necessary credentials and permissions. Avoid hardcoding credentials in scripts.
- **Environment Variables:** Use proper naming conventions for environment variables and keep them secure.
