import { SqsStack } from './sqs-stack'
import { Stage, StageProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { accountA , accountB} from '../accoountinfo'
import * as cdk from 'aws-cdk-lib';




export class PipelineStage extends Stage {
    constructor(scope: Construct, id: string, props?: StageProps) {
        super(scope, id, props);

        new SqsStack(this, 'sqs', {
            env: { account: accountA , region: 'us-east-1'},
            prefix: 'testing'
        } );

       new SqsStack(this, 'sqs1', {
            env: { account: accountB , region: 'us-east-1'},
            prefix: 'production'
        } );

    }
}