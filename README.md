# Imgur Search Messenger Bot
Facebook's [Messenger Platform](https://developers.facebook.com/products/messenger/) bot using the most awesome [imgur](https://imgur.com) api on the internet.

### Things it does

Currently this bot has the ability to do the following things:
- Searches the [gallery search endpoint](http://api.imgur.com/endpoints/gallery#gallery-search) in order to get the top 10 results at max. 
- Request image to be downloaded in the messenger using the buttons from the generic templates.

### Stuff that can be implemented maybe
- A pagination system for the search results
- A search queue and ability to add, delete and view items from the images list
- Album listing display
- Better UX and help to the user
- Ability to upload the images anonymously

#### Required environment variables to be entered
If you are running it in the **development** mode, store the keys in the `process.env` object in the `config/keys.js`
The sample code for storing these in `process.env` object can be like this 

```js
const ENV = process.env

ENV["NODE_ENV"] = "development" // Equivalent to process.env["NODE_ENV"] = "development"
```

Following keys are required to be entered in `keys/config.js` in `"development"` mode.
- *FACEBOOK_PAGE_TOKEN* (Your Facebook Messenger Page Token)
- *FAVOBOOK_VERIFICATION* (Webhook verfication key)
- *IMGUR_CLIENT_ID* (imgur's client id)

#### Deploying on your machine

`cd` into the project directory and run
```bash
npm install 
```
in order to install all the required packages. Be sure to enter all the required **environment variables**. 
Then just run 
```bash
node index.js
```

The application is available by default on `localhost:9999`. In order to verify webhook with facebook you can use a tunneling service.
I use [ngrok.io](https://ngrok.io) and feel it's good.

##### Contributions
We really want to see this project going somewhere. Don't be afraid to make a PR or raise an issue. I don't guarantee that this bot will be available to public because of how the Facebook permission approval works.

##### LICENSE
This project is licensed under ISC LICENSE. See [LICENSE](LICENSE) for more details. 

