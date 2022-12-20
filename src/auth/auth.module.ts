import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { JWTStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'SomeSecrets',
      signOptions: {
        expiresIn: '60s',
      },
    }),
  ],
  providers: [UsersService, AuthService, LocalStrategy, JWTStrategy],
  exports: [AuthService],
})
export class AuthModule {}
