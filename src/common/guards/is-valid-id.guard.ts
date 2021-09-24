import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class IsValidIdGuard implements CanActivate {
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { params } = request;
    if( params && params.id.match(/^[0-9a-fA-F]{24}$/) ) return true;
    throw new UnauthorizedException({ message: 'La peticion no es valida !' });
  }
}