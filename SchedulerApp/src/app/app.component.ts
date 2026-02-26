import { Component, ViewChild } from '@angular/core';
import { DataManager, GraphQLAdaptor } from '@syncfusion/ej2-data';
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService, ScheduleComponent, EventSettingsModel, ResizeService, DragAndDropService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, ResizeService, DragAndDropService]
})
export class AppComponent {
  @ViewChild('scheduleObj') scheduleObj: ScheduleComponent;
  public dataSource: DataManager;
  public eventSettings: EventSettingsModel;
  title: string;
  ngOnInit(): void {
    // app.component.ts
    this.dataSource = new DataManager({
      url: 'http://localhost:4400/',
      adaptor: new GraphQLAdaptor({
        query: `
      query getEvents($datamanager: DataManager) {
        getEvents(datamanager: $datamanager) {
          result {
            Id, Subject, StartTime, EndTime, Location, IsAllDay,
            StartTimezone, EndTimezone,
            RecurrenceRule, RecurrenceID, RecurrenceException, FollowingID,IsReadonly,IsBlock
          }
        }
      }
    `,
        response: {
          result: 'getEvents.result',
        },
        getMutation: (action: any): string => {
          if (action === 'batch') {
            return `
          mutation BatchUpdate($added: [AppointmentFields], $changed: [AppointmentFields], $deleted: [AppointmentFields]) {
            batchUpdate(added: $added, changed: $changed, deleted: $deleted) {
              Id, Subject, StartTime, EndTime, Location, IsAllDay,
              StartTimezone, EndTimezone,
              RecurrenceRule, RecurrenceID, RecurrenceException, FollowingID,IsReadonly,IsBlock
            }
          }
        `;
          }
          return '';
        }
      })
    });

    this.eventSettings = {
      dataSource: this.dataSource,
      fields: {
        id: 'Id',
        subject: { name: 'Subject' },
        startTime: { name: 'StartTime' },
        endTime: { name: 'EndTime' },
        isAllDay: { name: 'IsAllDay' },
        location: { name: 'Location' },
        startTimezone: { name: 'StartTimezone' },
        endTimezone: { name: 'EndTimezone' },
        recurrenceRule: { name: 'RecurrenceRule' },
        recurrenceID: { name: 'RecurrenceID' },
        recurrenceException: { name: 'RecurrenceException' },
        followingID: 'FollowingID',
        isReadonly: 'IsReadonly',
        isBlock: 'IsBlock'
      }
    };
  }
  public selectedDate: Date = new Date(2026, 1, 11);
}