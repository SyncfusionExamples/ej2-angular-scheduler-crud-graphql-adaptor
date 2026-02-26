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
    batchUpdate: (argument, { added = [], changed = [], deleted = [] }) => {
      for (const item of [...added, ...changed]) {
        const id = item.Id;
        const recId = item.RecurrenceID;
        const start = item.StartTime;

        const idx = eventsData.findIndex(e => sameId(e.Id, id));

        if (idx === -1) {
          if (recId) {
            const parent = eventsData.find(p => sameId(p.Id, recId));
            if (parent && start) {
              const stamp = new Date(start).toISOString()
                .replace(/[-:T.]/g, '')
                .slice(0, 15) + 'Z';

              let ex = (parent.RecurrenceException || '').split(',').filter(Boolean);
              if (!ex.includes(stamp)) {
                parent.RecurrenceException = ex.length ? ex.concat(stamp).join(',') : stamp;
              }
            }
          }
          eventsData.push({ ...item });
          continue;
        }

        Object.assign(eventsData[idx], item);

        if (eventsData[idx].RecurrenceID && eventsData[idx].StartTime) {
          const parent = eventsData.find(p => sameId(p.Id, eventsData[idx].RecurrenceID));
          if (parent) {
            const stamp = new Date(eventsData[idx].StartTime).toISOString()
              .replace(/[-:T.]/g, '')
              .slice(0, 15) + 'Z';

            let ex = (parent.RecurrenceException || '').split(',').filter(Boolean);
            if (!ex.includes(stamp)) {
              parent.RecurrenceException = ex.length ? ex.concat(stamp).join(',') : stamp;
            }
          }
        }
      }
      for (const item of deleted) {
        let id = (typeof item === 'object' && item !== null) ? item.Id : item;
        if (!id) continue;

        const isOccurrenceDelete = (typeof item === 'object' && !!item.RecurrenceID);

        if (isOccurrenceDelete) {
          const idx = eventsData.findIndex(e => sameId(e.Id, id));
          if (idx !== -1) eventsData.splice(idx, 1);
        } else {

          for (let i = eventsData.length - 1; i >= 0; i--) {
            const ev = eventsData[i];
            if (sameId(ev.Id, id) || sameId(ev.RecurrenceID, id)) {
              eventsData.splice(i, 1);
            }
          }
        }
      }

      return eventsData;
    }
  }
};
export default resolvers;