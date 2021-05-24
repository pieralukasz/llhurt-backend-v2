import { Controller, Get, Res } from '@nestjs/common';
import { ImageService } from './image.service';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get()
  async getProductPhoto(@Res() res) {
    const readStream = await this.imageService.getImage();

    return readStream.pipe(res);
  }
}
