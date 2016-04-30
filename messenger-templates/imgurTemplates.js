const mime = require("mime")

module.exports = function (bot) {
    
    
    function generateImageGeneric (imageData) {
        if (!imageData) {
            throw (new Error({
                message: "One of the required arguments is missing!"
            }))
        }
        else {
            var items = 0
            var elements = []
            imageData.data.forEach(function (image, index) {
                if (items > 9) return
                        
                var element = imageTemplate(image)
                if (element) {
                    items++
                    elements.push(element)
                }
            })
            
            return {
                attachment: {
                    type: "template",
                    payload: {
                        template_type: "generic",
                        elements: elements
                    }
                }
            }
        }
    }
    
    function imageTemplate (image, index, array) {
        
        if (!image.is_album && (image.type == "image/jpeg" || image.type == "image/png")) {
            var description = image.description
            
            if (image.description && image.description.length > 60) {
                description = image.description.substr("0, 60") + "..."
            }
            
            return ({
                title: image.title || "no title",
                subtitle: description || "no description",
                image_url: image.link,
                item_url: image.link,
                buttons: [
                    {
                        type: "postback",
                        title: "get this image!",
                        payload: "GET_" + image.link
                    },
                    {
                        type: "postback",
                        title: "save this image!",
                        payload: "SAVE_" + image.id  
                    },
                    {
                        type: "web_url",
                        title: "open in imgur!",
                        url: image.link
                    }
                ]
            })
        }
        else {
            return null
        }
    }
    
    return {
        generateImageGeneric: generateImageGeneric
    }
}