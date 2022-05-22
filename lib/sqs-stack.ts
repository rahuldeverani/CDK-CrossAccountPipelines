import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as cdk from 'aws-cdk-lib';


export interface testprops extends cdk.StackProps {
    env: cdk.Environment,
    prefix : string;
  
    }

export class SqsStack extends Stack {
  constructor(scope: Construct, id: string, props: testprops) {
    super(scope, id, props);


    const deadLetterQueue = new sqs.Queue(this, 'DeadLetterQueue',{
        queueName : props.prefix+' my-queue'
    });
}


  }

