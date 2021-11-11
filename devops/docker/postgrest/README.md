## PostgREST on Domino Data Lab

This project does 3 things:

* Serves as the Web UI
* Hosts PostgREST API to PostgreSQL at `/api` path
* Acts as a file download proxy for S3-based files at `/media` path

## Installation

See [general installation instructions](../README.md).

### Project-specific settings

In Project's settings add the following environment variables:
* `DOMINO_URL` - Domino Data Lab base URL, like `https://try.dominodatalab.com`
* `PGRST_DB_URI` - PostgreSQL DB URI. See [this document "Connection URIs" section](https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING). **Use the same DB URI as for [coordinator](../coordinator/README.md)**.

#### Setting up S3 for media access

**Use the same S3 bucket as for [coordinator](../coordinator/README.md).**

This settings will allow access to AWS S3 bucket from Domino using a "secret" in HTTP `User-Agent` header. This secret is used in 2 places: AWS S3 bucket policy and PostgREST Nginx configuration.

First generate a random string that will be used as a secret. It must be long enough (20+ symbols); it should contain different symbols except quotes and brackets. It will be referenced as `<SECRET_STRING>` below.

Change bucket settings:

1. Go to [AWS S3 management console](https://s3.console.aws.amazon.com/s3/buckets/)
2. Select the bucket
3. Go to *Permissions* tab
4. Under *Block public access* click *Edit* button. Uncheck all checkboxes and press *Save changes*. Confirm if needed.
5. After returning to bucket permissions page, edit the bucket policy:
    
    ```
    {
        "Version": "2012-10-17",
        "Id": "AllowAccessByUserAgent",
        "Statement": [
            {
                "Effect": "Allow",
                "Principal": "*",
                "Action": "s3:GetObject",
                "Resource": "arn:aws:s3:::poc-parser-test-data/*",
                "Condition": {
                    "StringLike": {
                        "aws:UserAgent": "<SECRET_STRING>"
                    }
                }
            }
        ]
    }
    ```

After this set the following environment variables for PostgREST project in Domino Data Lab:

* `S3_MEDIA_BUCKET` - bucket name
* `S3_MEDIA_USER_AGENT` = `<SECRET_STRING>`
* `AWS_DEFAULT_REGION` - the bucket's region; it's visible in AWS S3 console in ucket properties.

