import { Module } from '@nestjs/common';
import { TypesService } from './types.service';
import { TypesController } from './types.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Type, TypeSchema } from './schemas/type.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Type.name,
      schema: TypeSchema
    }
  ])],
  controllers: [TypesController],
  providers: [TypesService],
})
export class TypesModule {}
