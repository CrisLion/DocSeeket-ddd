import { Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { AppNotification } from "src/shared/application/app.notification";
import { ApiController } from "src/shared/interface/rest/api.controller";
import { RegisterDoctorRequest } from "src/users/application/dtos/request/register-doctor-request.dto";
import { RegisterDoctorResponse } from "src/users/application/dtos/response/register-doctor-response.dto";
import { GetDoctorUsers } from "src/users/application/messages/queries/get-doctor-users.query";
import { DoctorApplicationService } from "src/users/application/services/doctor-application.service";
import { Result } from "typescript-result";

@Controller('users/doctor')
export class DoctorController {
  constructor(
    private readonly doctorApplicationService: DoctorApplicationService,
    private readonly queryBus: QueryBus
  ) {}

  @Post('')
  async register(
    @Body() registerDoctorRequest: RegisterDoctorRequest,
    @Res({passthrough: true}) response
  ): Promise<object>
  {
    try {
      const result: Result<AppNotification, RegisterDoctorResponse> = 
      await this.doctorApplicationService.register(registerDoctorRequest);

      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }
      return ApiController.serverError(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('')
  async getAll(@Res({passthrough: true}) response): Promise<object> {
    try {
      const doctors = await this.queryBus.execute(new GetDoctorUsers());
      return ApiController.ok(response, doctors);
    } catch(error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('/:id')
  async getById(@Param('id') id: string, @Res({passthrough: true}) response): Promise<object> {
    try {
      const doctor = await this.doctorApplicationService.getById(id);
      return ApiController.ok(response, doctor);
    } catch(error) {
      return ApiController.serverError(response, error);
    }
  }

}