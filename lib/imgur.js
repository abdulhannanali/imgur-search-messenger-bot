const request = require("request")
const path = require("path")
const url = require("url")

const IMGUR_API_ENDPOINT = "https://api.imgur.com/3/"
const GALLERY_ENDPOINT = IMGUR_API_ENDPOINT + "gallery/"
var GALLERY_SEARCH_ENDPOINT = GALLERY_ENDPOINT + "search"

module.exports = function (clientId, clientSecret) {
    if (!clientId) {
        throw new Error("ClientID is required for Imgur API to function properly.")
    }
    
    function searchGallery (query, cb, sort, page, window) {
        
        request({
            url: GALLERY_SEARCH_ENDPOINT,
            qs: {
                q: "title: " + query    
            },
            headers: {
                "Authorization": "Client-ID " + clientId
            }
        }, function (error, response, body) {
            cb(error, response)
        })
    }
    
    
    return {
        searchGallery: searchGallery
    }
}