import { eventsData } from "./db";
function sameId(a, b) {
  if (a === undefined || a === null || b === undefined || b === null) return false;
  return String(a) === String(b);
}
const resolvers = {
  Query: {
    getEvents: (parent, datamanager, context, info) => { 
      const dataArgs = datamanager;
      const params = JSON.parse(dataArgs.datamanager.params);
      console.log('startDate: ' + params.StartDate + ' EndDate: ' + params.EndDate);
      var data = eventsData.filter(x => new Date(x.StartTime) >= new Date(params.StartDate) && new Date(x.EndTime) <= new Date(params.EndDate));
      return {result: data || eventsData};
    }
  },
  Mutation: {
    batchUpdate: (parent, { added, changed, deleted }, context, info) => {
      if (added && added.length > 0) {
        console.log('added: ' + added.length);
        added.forEach((order) => {
          let existingIndex = -1;
          for (let i = 0; i < eventsData.length; i++) {
            if (sameId(eventsData[i].Id, order && order.Id)) {
              existingIndex = i;
              break;
            }
          }
          if (existingIndex >= 0) {
            const target = eventsData[existingIndex];
            if ('Id' in order) target.Id = order.Id;
            if ('Subject' in order) target.Subject = order.Subject;
            if ('StartTime' in order) target.StartTime = order.StartTime;
            if ('EndTime' in order) target.EndTime = order.EndTime;
            if ('Location' in order) target.Location = order.Location;
            if ('IsAllDay' in order) target.IsAllDay = order.IsAllDay;
            if ('RecurrenceRule' in order) target.RecurrenceRule = order.RecurrenceRule;
            if ('StartTimezone' in order) target.StartTimezone = order.StartTimezone;
            if ('EndTimezone' in order) target.EndTimezone = order.EndTimezone;
          } else {
            eventsData.push(order);
          }
        });
      }
      if (changed && changed.length > 0) {
        console.log('changed: ' + changed.length);
        changed.forEach((order) => {
          let target = null;
          for (let i = 0; i < eventsData.length; i++) {
            if (sameId(eventsData[i].Id, order && order.Id)) {
              target = eventsData[i];
              break;
            }
          }
          if (!target) {
            console.log('Change skipped: app not found for Id:', order && order.Id);
            return;
          }
          if ('Id' in order) target.Id = order.Id;
          if ('Subject' in order) target.Subject = order.Subject;
          if ('StartTime' in order) target.StartTime = order.StartTime;
          if ('EndTime' in order) target.EndTime = order.EndTime;
          if ('Location' in order) target.Location = order.Location;
          if ('IsAllDay' in order) target.IsAllDay = order.IsAllDay;
          if ('RecurrenceRule' in order) target.RecurrenceRule = order.RecurrenceRule;
          if ('StartTimezone' in order) target.StartTimezone = order.StartTimezone;
          if ('EndTimezone' in order) target.EndTimezone = order.EndTimezone;
        });
      }
      if (deleted && deleted.length > 0) {
        console.log('deleted: ' + deleted.length);
        deleted.forEach((order) => {
          const eventID = (order && typeof order === 'object') ? order.Id : order;
          let idx = -1;
          for (let i = 0; i < eventsData.length; i++) {
            if (sameId(eventsData[i].Id, eventID)) {
              idx = i;
              break;
            }
          }
          if (idx === -1) {
            console.log("Delete skipped: app not found.", eventID);
            return;
          }
          eventsData.splice(idx, 1);
        });
      }
    }
  }
};
export default resolvers;