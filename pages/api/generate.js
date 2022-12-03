import {Configuration, OpenAIApi} from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration)

const basePromptPrefix = "";
const generateAction = async (req,res) => {
    // Run first prompt                         //userInput from index js textarea
    console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

    const baseCompletion = await openai.createCompletion({
        model: 'text-davinci-003',      
        prompt: `${basePromptPrefix}${req.body.userInput}`,//text form userInput
        temperature: 0.7,
        max_tokens:250,
        top_p:1,
        frequency_penalty:0,
        presence_penalty:0
    })

    const basePromptOutput = baseCompletion.data.choices.pop();

    res.status(200).json({ output: basePromptOutput})
};

export default generateAction