import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMe() {
    return { message: 'Usuário autenticado!' };
  }
}