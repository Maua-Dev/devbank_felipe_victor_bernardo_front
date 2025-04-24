#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { IacStack } from '../lib/iac-stack';

const app = new cdk.App();

const env = {
  account: process.env.AWS_ACCOUNT_ID,
  region: process.env.AWS_REGION
}

const stackName = process.env.STACK_NAME || 'SimpleReactTemplateStack'
const projectName = process.env.PROJECT_NAME || 'SimpleReactTemplateFront'

const tags = {
  'project': projectName,
  'stage': 'TEST',
  'stack': 'FRONT',
  'owner': 'DevCommunity'
}

new IacStack(app, stackName, {
  env: env,
  tags: tags
});