import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateGeminiDto } from './dto/create-gemini.dto';
import { UpdateGeminiDto } from './dto/update-gemini.dto';
import { GoogleGenAI } from '@google/genai';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';

@Injectable()
export class GeminiService {
  ai: GoogleGenAI;
  constructor(private readonly configService: ConfigService) {
    const ai = new GoogleGenAI({
      apiKey: this.configService.getOrThrow('GEMINI_API_KEY'),
    });
    this.ai = ai;
  }

  async create(createAiDto: CreateGeminiDto) {
    console.log(createAiDto);
    // const listModels = await this.ai.models.list();
    // console.log(listModels);
    // const result = 'kek';

    try {
      const result = await this.ai.models.generateContent({
        model: createAiDto.model,
        contents: createAiDto.prompt,
        // prompt: createAiDto.prompt,
        // config: {
        // negativePrompt: createAiDto.negativePrompt,
        // aspectRatio: createAiDto.aspectRatio,
        // },
      });

      if (!result.candidates || !result.candidates[0].content?.parts) {
        throw new InternalServerErrorException('Server Ai error');
      }

      for (const part of result.candidates[0].content.parts) {
        if (part.text) {
          console.log(part.text);
        } else if (part.inlineData) {
          const imageData = part.inlineData.data ?? '';
          const buffer = Buffer.from(imageData, 'base64');
          fs.writeFileSync('gemini-native-image.png', buffer);
          console.log('Image saved as gemini-native-image.png');
        }
      }

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    return `This action returns all ai`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ai`;
  }

  update(id: number, updateAiDto: UpdateGeminiDto) {
    return `This action updates a #${id} ai`;
  }

  remove(id: number) {
    return `This action removes a #${id} ai`;
  }
}
