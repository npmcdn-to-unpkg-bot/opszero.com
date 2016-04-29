from __future__ import print_function # Python 2/3 compatibility

import boto3
import json
import decimal

# Helper class to convert a DynamoDB item to JSON.
class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, decimal.Decimal):
            if o % 1 > 0:
                return float(o)
            else:
                return int(o)
        return super(DecimalEncoder, self).default(o)

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('AcksinEmails')

print('Loading function')

def lambda_handler(event, context):
    print("Received event: " + json.dumps(event, indent=2))

    product = ''
    try:
        product = event['Product']
    except:
        print("No product found")

    response = table.put_item(
        Item={
            'Email': event['Email'],
            'Products': [event['Product']],
            # 'Notes': event['Notes']
        }
    )

    # Deal with more than one subscription.

    print("PutItem succeeded:")
    print(json.dumps(response, indent=4, cls=DecimalEncoder))

    return ""
