import { Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { AppNotification } from "src/shared/application/app.notification";
import { ApiController } from "src/shared/interface/rest/api.controller";
import { RegisterPatientRequest } from "src/users/application/dtos/request/register-patient-request.dto";
import { RegisterPatientResponse } from "src/users/application/dtos/response/register-patient-response.dto";
import { GetPatientUsers } from "src/users/application/messages/queries/get-patient-users.query";
import { PatientApplicationService } from "src/users/application/services/patient-application.service";
import { Result } from "typescript-result";

@Controller('users/patient')
export class PatientController {
  constructor(
    private readonly patientApplicationService: PatientApplicationService,
    private readonly queryBus: QueryBus
  ) {}

  @Post('')
  async register(
    @Body() registerPatientRequest: RegisterPatientRequest,
    @Res({passthrough: true}) response
  ): Promise<object>
  {
    try {
      const result: Result<AppNotification, RegisterPatientResponse> = 
      await this.patientApplicationService.register(registerPatientRequest);

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
      const patients = await this.queryBus.execute(new GetPatientUsers());
      return ApiController.ok(response, patients);
    } catch(error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('/:id')
  async getById(@Param('id') id: string, @Res({passthrough: true}) response): Promise<object> {
    try {
      const patient = await this.patientApplicationService.getById(id);
      return ApiController.ok(response, patient);
    } catch(error) {
      return ApiController.serverError(response, error);
    }
  }

}