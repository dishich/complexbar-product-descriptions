import ResponseCache from "next/dist/server/response-cache";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


export default async function getStaticProps(req, res) {


  const options = {method: 'GET', headers: {Authorization: 'Basic ZGlzaGljaDpOaWRrbGxydTQ='}};
  const uidres = await fetch(`https://api.pbd.complexbar.ru/articles?article_number=${req.body.product}`, options);

  let uiddata = await uidres.json();

    let productuid=uiddata[0].id;

  const detailsres = await fetch('https://api.pbd.complexbar.ru/prods?id='+productuid, options);
  const detailsdata = await detailsres.json();
  const productname = await detailsdata.title;
  const allprops = await detailsdata.props;

  let propsresults = await allprops.map(({ title, _value }) => `\n${title} ${_value}`).join('')
 

  //console.log(productname);
  //console.log(propsresults);

    
 
  
    const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: generatePrompt(req.body.detailsdata), 
    temperature: 0.7,
    max_tokens: 2048,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
 
    function generatePrompt() {
      //const capitalizedProduct = detailsdata;
     
       // product[0].toUpperCase() + product.slice(1).toLowerCase();
      return `Сформируй художественное описание для товара ${productname} ${propsresults}`;
    
    } 
} 
