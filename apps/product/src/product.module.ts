import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { DatabaseModule } from '@app/common';
import { DatabaseService } from '@app/common/database/database.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductController],
  providers: [ProductService , DatabaseService],
})
export class ProductModule {}
