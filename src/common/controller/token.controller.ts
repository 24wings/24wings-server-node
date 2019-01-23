import { Controller, Get, Req, Request } from '@nestjs/common';
import { JwtService } from '../../hk/service/jwt.service';
import { success } from '../util/res/success';
import { ApiOperation } from '@nestjs/swagger';

@Controller('common/token')
export class TokenController {
  constructor() //private jwtService: JwtService
  {}
  @ApiOperation({ title: '获取用户token', description: '用户token' })
  @Get('token')
  async apiToken(@Req() req: Request) {
    // let tokenStr = req.headers.get('Authorization').replace('Bearer ', '');
    // let token = await this.jwtService.getUserFromToken(tokenStr);
    // return success({ token });
  }
}
