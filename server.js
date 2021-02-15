const express = require("express")
const request = require("request")
const cheerio = require("cheerio")
const bodyParser = require("body-parser")
const cors  = require("cors")


const app = express()
app.use(bodyParser.json())
app.use(cors())
//get data function : 

 
   


//main function 
 app.get("/display_products",async(req,response)=>{
    request("https://www.tayara.tn/",(error,res,html)=>{
        var productsList = []
        
        if(!error && res.statusCode ==200)
        {
            const $ =  cheerio.load(html);
            $('.card').each((i,el)=>{
               let price = $(el).find(".card__body__element").eq(0).text()
               let title = $(el).find(".card__body__element").eq(1).text()
               let imageSrc = $(el).find(".card__preview").attr("style").replace(/.*\s?url\([\'\"]?/, '').replace(/[\'\"]?\).*/, '')
               productsList.push({"price":price,"title":title,"imageSrc":imageSrc})
               //console.log(res)
             
            })
            
        }
        response.send({"response":productsList})
    })
})

app.listen(5000,(err,res)=>{
    (err) ? console.log("Error" ) :(console.log("server is running "))
})