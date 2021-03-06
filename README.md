# Assetbase

Open Source Platform to share your work

# About

Assetbase is using [Meteor](https://www.meteor.com/install) and [React](https://facebook.github.io/react/).

## Installation

### Meteor

To run Assetbase you need to install Meteor first: [Meteor Quick Start](https://github.com/meteor/meteor#quick-start).

### Settings.json

Assetbase currently only supports Amazons S3 Service. To run Assetbase you need to provide the S3/AWS Keys to the 'settings.json' in your application root folder.

settings.json
````json
{
	"S3Bucket": "",
	
	"AWSAccessKeyId": "",
  	"AWSSecretAccessKey": "",

  	"AWSRegion": ""
}
````

### run

````
   npm run init
   npm run start
````

## Features

- Asset Creation/Editing
- Commenting Assets
- Fileupload to Amazon S3 (via [Slingshot](https://github.com/CulturalMe/meteor-slingshot/))
- Responsive Design 

## Roadmap

- Translations
- Improve Fileupload
- Improve Login/Registration
- Improve User Profile
- User Notification
- Assets Browsing and Filtering
- Follow Users
- Admin Area

## License

Note that Assetbase is distributed under the [MIT License](http://opensource.org/licenses/MIT).
