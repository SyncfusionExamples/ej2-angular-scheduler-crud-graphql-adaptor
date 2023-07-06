import { Component, ViewChild } from '@angular/core';
import { DataManager, GraphQLAdaptor } from '@syncfusion/ej2-data';
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService, ScheduleComponent, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService]
})
export class AppComponent {
  @ViewChild('scheduleObj') scheduleObj: ScheduleComponent;
  public dataSource: DataManager;
  public eventSettings: EventSettingsModel;
  ngOnInit(): void {
    this.dataSource = new DataManager({
      url: 'http://localhost:4400/',
      adaptor: new GraphQLAdaptor({
        response: {
            result: 'getEvents.result',
        },
        query:`query getEvents($datamanager: DataManager) {
          getEvents(datamanager: $datamanager) {
              result { Id, Subject, StartTime, EndTime, Location, IsAllDay, RecurrenceRule, StartTimezone, EndTimezone }
          }
        }`,
        getMutation: function (action: any): string {
          if (action === 'batch') {
            return `mutation BatchUpdate($added: [AppointmentFields], $changed: [AppointmentFields], $deleted: [AppointmentFields]){
              batchUpdate(added: $added, changed: $changed, deleted: $deleted) {
                Id, Subject, StartTime, EndTime, Location, IsAllDay, RecurrenceRule, StartTimezone, EndTimezone
              }
            }`;
          }
        }
      })
    });
    this.eventSettings = { dataSource: this.dataSource };
  }
  public selectedDate: Date = new Date(2021, 1, 11);
}