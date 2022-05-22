import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {CodeBuildStep, CodePipeline, CodePipelineSource} from "aws-cdk-lib/pipelines";
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as codecommit from 'aws-cdk-lib/aws-codecommit'
import { Pipeline } from 'aws-cdk-lib/aws-codepipeline';
import { PipelineStage } from './pipeline-stage';



export class CdkPipelineDemoStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

     const repo= new codecommit.Repository(this, 'CDKpipelinerepo', {
      repositoryName: "CDKpipelinerepo"
    });
    const pipeline = new CodePipeline(this, 'Pipeline', {
      crossAccountKeys: true,
      pipelineName: 'Cdkpipeline',
      synth: new CodeBuildStep('SynthStep', {
              input: CodePipelineSource.codeCommit(repo, 'master'),
              installCommands: [
                  'npm install -g aws-cdk'
              ],
              commands: [
                  'npm ci',
                  'npm run build',
                  'npx cdk synth'
              ]
          }
      )
  });
  const deploy = new PipelineStage(this, 'Deploy');
  const deployStage = pipeline.addStage(deploy);
  }
}
