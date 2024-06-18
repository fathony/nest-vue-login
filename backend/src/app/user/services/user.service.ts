import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "@src/database/entities/user.entity";
import { Repository } from "typeorm";
import { REQUEST } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "@src/app/auth/strategy/jwt.strategy";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    @Inject(REQUEST) private request: Request,
    private jwtService: JwtService
  ) {
  }

  async getProfile() {
    // @ts-ignore
    const token = this.request.headers.authorization.split(" ").pop() as string;
    const jwt = this.jwtService.decode(token) as JwtPayload;

    return this.repository.findOneBy({
      id: jwt.id
    });
  }
}