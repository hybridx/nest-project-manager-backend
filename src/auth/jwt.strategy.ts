import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SomeSecrets',
    });
  }

  async validate(payload: any) {
    return {
      id: payload.sub,
      name: payload.name,
      random: Math.random(),
    };
  }
}
