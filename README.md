# CDK-CrossAccountPipelines

This repo contains Demo Code for a CDK pipeline using which we can deploy stack cross account.
Pre requisite for deploying cross account , do CDK bootstrap in account 2 as:

### Bootstrap Command
npx cdk bootstrap --trust Account-1 --cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess aws://Account-2/us-east-1

Once boot strap is done , you can run the CDK pipeline.

### How CDK pipeline works ?

-> Initially , we create a Empty CDK pipeline with a repository configured and deploy it to our account.
-> Next , we push the CDK code to the repository.
-> Now , we make changes to the code and push them to the repo , this causes CDK pipeline to run. First it mutates the pipeline and then deploys the stacks.

In this example , we are deploying to two accounts and passing props to those stacks.
Example: (lib/pipline-stage.ts)

        new SqsStack(this, 'sqs', {
            env: { account: accountA , region: 'us-east-1'},
            prefix: 'testing'
        } );

Here we are passing prefix to the stack which will be created in account A by pipeline and using it to name resource as: (lib/sqs-stack.ts)

        const deadLetterQueue = new sqs.Queue(this, 'DeadLetterQueue',{
            queueName : props.prefix+' my-queue'
            });
         }

This creates resources with a prefix in prod, test , dev accounts.
