const{client, Client}= require("@notionhq/client");
const { text } = require("express");

const notion = new Client({auth: process.env.NOTION_API_KEY})

 async function getDatabase(){
const response = await notion.databases.retrieve({database_id:process.env.NOTION_DATABASE_ID})
// console.log(response);
}

async function getTags(){
    const database= await notion.databases.retrieve({database_id:
    process.env.NOTION_DATABASE_ID})
    console.log(database.properties.Tags);
}

getDatabase();

function createSuggestion({title,description,isVote,plan}){
    notion.pages.create({
        parent:{
            database_id:process.env.NOTION_DATABASE_ID
        },
        properties:{
        [process.env.NOTION_TITLE_ID]:{
            title:[
                {
                    type: 'text',
                    text:{
                        content:title,
                    },
                },
            ],
        },
[process.env.NOTION_DESC_ID]:{
    rich_text:[{
        type:"text",
        text:{
            content: description,
        },
    },
    ],
},
[process.env.NOTION_VOTES_ID]:{
    checkbox: isVote,
},
[process.env.NOTION_PLAN_ID]:{
    rich_text:[
        {
            type: 'text',
            text:{
                content:plan,
            },
        },
    ],},

        }
    })
};

module.exports={
    createSuggestion,
    getTags
};


// createSuggestion({
//     title:"test",
// description:"Hello",
// isVote:true,
// plan:"Standard"
// });

//getTags()

