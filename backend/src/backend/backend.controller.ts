import {
  Controller,
  UploadedFile,
  UseInterceptors,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { BackendService } from "./backend.service";
import { Backend } from "./backend.entity";

@Controller("products")
export class BackendController {
  constructor(public backendService: BackendService) {}

  @Get("/all")
  findAllIds() {
    return this.backendService.findAllIds();
  }
  @Get()
  findAll() {
    return this.backendService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.backendService.findOne(Number(id));
  }

  @Post()
  create(@Body() product: Partial<Backend>) {
    return this.backendService.create(product);
  }

  @Post("uploads")
  @UseInterceptors(FileInterceptor("file"))
  upload(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error("No file uploaded");
    }
    return { images: file.filename };
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() product: Partial<Backend>) {
    return this.backendService.update(Number(id), product);
  }

  @Put(":id/field")
  updateProductField(
    @Param("id") id: number,
    @Body() updateData: { field: string; value: number | string },
  ) {
    if (!updateData.field || updateData.value === undefined) {
      throw new Error("Field and value are required");
    }
    return this.backendService.updateField(
      id,
      updateData.field,
      updateData.value,
    );
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.backendService.remove(Number(id));
  }
}
