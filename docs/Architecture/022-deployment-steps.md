# Server Deployment

## Overview

This GitHub Actions workflow automates the deployment of the Lender API to the production server using AWS CodeDeploy. The workflow is triggered when changes are pushed to the `production` branch for production server , `main` branch for staging server.

## Steps to follow for deployment

- **Staging server**
    1. Merge PR or Push Changes to Main:
       - Ensure that all changes intended for staging have been merged into the `main` branch. If not using pull requests, push changes directly to the main branch.
- **Production Server**
    1. Merge PR or Push Changes to Production:
       - Ensure that all changes intended for production have been merged into the `production` branch. If not using pull requests, push changes directly to the production branch.
    2. If you want to push the latest changes run on staging to the production then follow steps like
       1. Checkout to Main Branch and Pull:
          - Before deploying changes to the production server, ensure you are on the main branch and have the latest changes.
          ```bash
          git checkout main
          git pull
       2. Push Changes to Production Branch:
          - Push the changes from the main branch to the production branch.
          ```bash
          git push origin main:production

## Workflow Configuration

The workflow is defined in the `.github/workflows/deploy_main.yml` file for staging server and `.github/workflows/deploy_production.yml` file for the production server . It consists of a job named "Deploy Lender API Production Server" for production server and "Deploy Lender API Staging Server" for staging server with a single step:

- **Deploy:**
    - **Runs on:** Ubuntu latest
    - **Strategy:**
        - Matrix strategy is employed to define variables for deployment, such as `appname` and `deploy-group`.

- **Steps:**
    1. **Checkout:**
        - Checks out the code repository using `actions/checkout`.

    2. **Configure AWS Credentials:**
        - Configures AWS credentials using `aws-actions/configure-aws-credentials`. The AWS access key ID, secret access key, and region are retrieved from GitHub secrets.

    3. **AWS Create Deployment:**
        - Executes an AWS CLI command to create a deployment using AWS CodeDeploy. The deployment is based on the specified application name (`appname`) and deployment group (`deploy-group`). It uses the GitHub repository and commit ID for the deployment.

    4. **BeforeInstall Script:**
        - Executes the `before_install.sh` script, which prepares the environment by installing necessary tools like AWS CLI and jq.

    5. **AfterInstall Script:**
        - Executes the `after_install.sh` script, which sets up NVM, installs dependencies using Yarn, retrieves secrets from AWS Secrets Manager, and creates a build.

    6. **ApplicationStart Script:**
        - Executes the `application_start.sh` script, which sets up NVM and starts the application using the specified npm command.

## Usage

To trigger the deployment manually or for testing purposes, create a push to the `production` branch. This can be achieved by pushing changes or creating a pull request targeting the `production` branch.

### Secrets

Ensure that the following secrets are set in your GitHub repository:

- `AWS_ACCESS_KEY_ID`: AWS access key ID with the necessary permissions for CodeDeploy.
- `AWS_SECRET_ACCESS_KEY`: AWS secret access key corresponding to the provided access key.
- `AWS_REGION`: AWS region where the deployment will take place.

### Branch Configuration

The deployment workflow is configured to run only on changes to the `production` branch for production server & `main` branch for staging server . Modify the branch configuration in `.github/workflows/deploy_main.yml` for staging server and `.github/workflows/deploy_production.yml` for production server if you want to deploy on a different branch.

## Customization

Feel free to customize the workflow to match your specific deployment requirements. Adjust variables in the matrix strategy, modify deployment steps, or add additional steps as needed.

