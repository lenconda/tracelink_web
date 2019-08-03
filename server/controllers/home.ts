import {
  JsonController, Render, Get
} from 'routing-controllers';
import { Inject } from 'typedi';

@JsonController('')
export default class LinksController {
  @Get('/')
  @Render('index.html')
  async test() {
    return {};
  }
}
