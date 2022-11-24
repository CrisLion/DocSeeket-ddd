import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { PatientRegistered } from "src/users/domain/events/patient-registered.event";

@EventsHandler(PatientRegistered)
export class PatientRegisteredHandler implements IEventHandler<PatientRegistered> {
  constructor() {}

  async handle(event: PatientRegistered) {
    console.log(event);
  }
}