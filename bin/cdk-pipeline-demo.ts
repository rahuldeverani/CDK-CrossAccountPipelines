#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkPipelineDemoStack } from '../lib/cdk-pipeline-demo-stack';

const id= "Account A id here"

const app = new cdk.App();
new CdkPipelineDemoStack(app, 'CdkPipelineDemoStack', {
  env: {
    region: 'us-east-1',
    account: id,
  }

});