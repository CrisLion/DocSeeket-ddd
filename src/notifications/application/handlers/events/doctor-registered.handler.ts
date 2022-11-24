import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { DoctorRegistered } from "src/users/domain/events/doctor-registered.event";

@EventsHandler(DoctorRegistered)
export class DoctorRegisteredHandler implements IEventHandler<DoctorRegistered> {
  constructor() {}

  async handle(event: DoctorRegistered) {
    console.log(event);
  }
}