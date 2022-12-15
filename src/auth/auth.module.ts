import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serilizer';

@Module({
  imports: [UsersModule, PassportModule.register({ session: true })],
  providers: [UsersService, AuthService, LocalStrategy, SessionSerializer],
})
export class AuthModule {}
