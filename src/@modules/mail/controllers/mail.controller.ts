import { MailSendDto } from './../dtos/mailSend.dto';
import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MailHelper } from '../helpers/mail.helper';

@ApiTags('Mail')
@Controller('mail')
export class MailController {
  mailHelper = new MailHelper();

  //! Send
  @Post('/send')
  async send(@Body() data: MailSendDto): Promise<any> {
    try {
      await this.mailHelper.Mail(data);
      return { message: "Success" };
    } catch (error) {
      return error;
    }
  }
}
