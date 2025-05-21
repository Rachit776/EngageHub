import {StreamChat} from "stream-chat"
import "dotenv/config"

const apiKey = process.env.STREAM_API_KEY
const apiSecret = process.env.STREAM_SECRET_KEY

if(!apiKey || !apiSecret){
    console.log("Stream API or Secret Key is missing");
}

const streamClient = StreamChat.getInstance(apiKey,apiSecret);