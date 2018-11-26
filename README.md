# Image Recognition via Email
Send email with image url to receive recognition details from Blippar's engine

# Steps to run the recognition
* Create an account in postmark
* Provide your personalized settings in email_settings.json
* Deploy the code in a publicly accessible server
* Provide the server IP or domain name under Inbound -> Credentials in postmark server settings
* Send email to the inbound email address provided by Postmark. It should contain following in the body
  * Recognise=<image_url>
* You'll shortly receive email from postmark service containing recognition tags

# Settings:
* Credentials:
  * serverToken: This is your server token from postmark service
  * senderEmail: This email has to be specifically registered with Postmark's inbound email service


# 3rd party service
* Blippar: https://developer.blippar.com/portal/vs-api/index/#demoSection
* Postmark: https://postmarkapp.com
