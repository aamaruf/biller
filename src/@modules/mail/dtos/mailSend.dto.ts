import { ApiProperty } from '@nestjs/swagger';

export class MailSendDto {
  @ApiProperty({ example: 'farzan@gmail.com', required: true })
  // @IsEmail()
  email: string;

  @ApiProperty({ example: 'Subject of Email', required: true })
  subject: string;

  @ApiProperty({ example: 'Message Body For Email.....', required: true })
  body: string;
}
