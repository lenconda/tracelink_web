import {
  JsonController, Render, Get
} from 'routing-controllers';
import { Inject } from 'typedi';

@JsonController('')
export default class CreateController {
  @Get('/')
  @Render('index.html')
  async test() {
    return { name: 'fuck' };
  }
}
