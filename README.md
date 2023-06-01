# Jumper AI Middleware for Whatsapp templates

- This sample app allows you to list the WhatsApp templates that are created in the Xotic Jumper account (page ID = 4885823201869824), then upon selecting a template, it asks for the relevant parameters (buttons, images, files, videos, parameters) and send the template to your number

- To test the web app you need to open the app url appending your phone number in international format, for example {neruappurl}/send?phone=447865431209

## Prerequisites

- Access to the Xotic Jumper AI account if you want to manage templates
- JWT provided by the Jumper AI team
- Early Access for VCP/NeRu

## Install and Run

- populate a `neru.yml` file as per `sample.yml`
- add the JWT provided by the Jumper team and leave the `channels` environment variable as it is
- debug and deploy in Vonage Cloud Platform/NeRu (neru debug or neru deploy)
