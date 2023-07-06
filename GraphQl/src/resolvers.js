import { eventsData } from "./db";

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
          eventsData.push(order);
        });
      }
      if (changed && changed.length > 0) {
        console.log('changed: ' + changed.length);
        changed.forEach((order) => {
          let newOrder = eventsData.find(app => app.Id === order.Id);
          newOrder.Id = order.Id;
          newOrder.Subject = order.Subject;
          newOrder.StartTime = order.StartTime;
          newOrder.EndTime = order.EndTime;
          newOrder.Location = order.Location;
          newOrder.IsAllDay = order.IsAllDay;
          newOrder.RecurrenceRule = order.RecurrenceRule;
          newOrder.StartTimezone = order.StartTimezone;
          newOrder.EndTimezone = order.EndTimezone;
        });
      }
      if (deleted && deleted.length > 0) {
        console.log('deleted: ' + deleted.length);
        deleted.forEach((order) => {
          const orderIndex = eventsData.findIndex(app => app.Id === parseInt(order.Id));
          if (orderIndex === -1) throw new Error("app not found." + order.Id);
          eventsData.splice(orderIndex, 1);
        });
      }
    }
  }
};

export default resolvers;