import express from 'express';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.route('/').get((req, res) => {
  res.status(200).json({ message: "Hello from DALL.E ROUTES" })
})

router.route('/').post(async (req, res) => {
  try {
    /*
    // Log the received prompt
    console.log("Received prompt:", req.body.prompt);

    // Mock response
    const mockImage = "iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAC7EJwzAAAAKklEQVR42mJ89+7dfwYKAAVF1tVBMCHgZ2BhQEWhkKhkGFsNGUqNgFIADjvgFYkF8a1AAAAAElFTkSuQmCC";
    
    // Simulate a delay to mimic API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log("Sending mock response");
    res.status(200).json({ photo: mockImage });
    */

    // Actual API call
    const { prompt } = req.body;
    const response = await openai.images.generate({
      prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json'
    });
    const image = response.data[0].b64_json;
    res.status(200).json({ photo: image });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" })
  }
})

export default router;