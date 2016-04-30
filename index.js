const http = require("http")
const Bot   = require("messenger-bot")

const ENV = process.env
const NODE_ENV = ENV["NODE_ENV"] || "development"


if (NODE_ENV == "development") {
    require("./config/keys")
}

const PORT = ENV.PORT || 9999
const HOST = ENV.HOST || "0.0.0.0"

var savedImages = {}

var bot = new Bot({
    token: ENV["FACEBOOK_PAGE_TOKEN"],
    verify: ENV["FACEBOOK_VERIFICATION"]
})

const imgur = require("./lib/imgur")(ENV["IMGUR_CLIENT_ID"])
const templater = require("./messenger-templates/imgurTemplates")(bot)

bot.on("message", function (payload, reply) {
    if (payload && payload.message.text) {
        handleText(payload, reply)
    }
})

bot.on("postback", function (data, reply) {
    var postback = data.postback.payload
    var senderId = data.sender.id
    
    if (postback) {
        var match = postback.match(/(\w+)_(.+)/i)
        console.log(match)
        if (match[1] == "GET" && match[2]) {
            reply({
                attachment: {
                    type: "image",
                    payload: {
                       url: match[2] 
                    }
                }
            })
        }
        else if (match[1] == "SAVE" && match[2]) {
            try {
                if (savedImages[senderId]) {
                    var found = savedImages[senderId].find((id) => {
                        return id == match[2]
                    })
                    
                    console.log(found)
                    
                    if (!found) {
                        savedImages[senderId].push(match[2])                            
                    }
                }
                else {
                    savedImages[senderId] = [match[2]]
                }
                
                reply({
                    attachment: {
                        type: "template",
                        payload: {
                            template_type: "button",
                            text: `Image saved!`,
                            buttons: [
                                {
                                    type: "web_url",
                                    title: "Open Image!",
                                    url: "https://imgur.com/" + match[2]
                                },
                                {
                                    type: "postback",
                                    title: "Show saved Images!",
                                    payload: "SHOW_SAVED"
                                }
                            ]
                        }
                    }
                }, console.log)    
            }
            catch (error) {
                
            }
            
        }
    }
})



function handleText (payload, reply) {
    var text = payload.message.text
    
    // Text beginning with / are recognized as commands
    if (text && text.indexOf(0) != "/") {
        searchImgur(payload, reply)
    }
    else {
        
    }
} 

function searchImgur(payload, reply) {
    var messageText = payload.message.text
    reply({
        text: "hold on! while we search imgur.com"
    }, function (error) {
        if (error) {
            return errorHandler(error)
        }
        
        imgur.searchGallery(messageText, function (error, response) {
            if (!error && response) {
                var imageData = JSON.parse(response.body)
                
                if (imageData.data && imageData.data[0]) {
                    reply(templater.generateImageGeneric(imageData), function (error) {
                        if (error) {
                            errorHandler(error)
                        }
                    })
                }
                else {
                    noResultsFound(payload)
                }
            }
            else {
                errorHandler(error)
            }
        })
    })
}

// Message if no results are found
function noResultsFound (payload) {
    bot.sendMessage(payload.sender.id, {
        text: "No results found for the given query!"
    })
}

function errorHandler (error) {
    console.error(error)
}

http.createServer(bot.middleware()).listen(PORT, HOST, function (error) {
    if (!error) {
        console.log("Server is listening on ")
        console.log("PORT " + PORT)
        console.log("HOST " + HOST)
    }
    else {
        console.error(error)
    }
})