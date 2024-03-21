import { redis } from "@/lib/redis";
import { getDate } from "@/utils";
import { parse } from "date-fns";

type AnalyticsArgs = {
    retention?: number;
}

type TrackOptions = {
    persist?: boolean;
}

export class Analytics {
    private retention: number = 60 * 60 * 24 * 7;

    constructor(options?: AnalyticsArgs) {
        if (options?.retention) {
            this.retention = options.retention;
        }
    }


    async track(namespace: string, event: { menuId?: string, page?: string, itemId?: string, duration?: number } = {}, options?: TrackOptions) {
        let key = `analytics::${namespace}`;
        if (event.menuId) {
            key += `::${event.menuId}`;
        }
        if(!options?.persist) {
            key += `::${getDate()}`;
        }
        
        let incr = 1;
        if (namespace === "menuItemViewDuration" && event.duration) {
            incr = event.duration;
        }
        // db call to persist this event
        await redis.hincrby(key, JSON.stringify(event), incr);
        // if(!options?.persist) {
        //     await redis.expire(key, this.retention);
        // }
    }

    async retrieveDays(namespace: string, nDays: number) {
        type AnalyticsPromise = ReturnType<typeof analytics.retrieve>
        const promises: AnalyticsPromise[] = [];
        for (let i = 0; i < nDays; i++) {
            promises.push(analytics.retrieve(namespace, getDate(i)));
        }

        const fetched = await Promise.all(promises);
        const data = fetched.sort((a, b) => {
            if (parse(a.date, "dd/MM/yyyy", new Date()) > parse(b.date, "dd/MM/yyyy", new Date())) {
                return 1;
            } else {
                return -1;
            }
        });

        return data;
    }

    async retrieve(namespace: string, date: string) {
        const res = await redis.hgetall<Record<string, string>>(`analytics::${namespace}::${date}`);

        return {
            date,
            events: Object.entries(res ?? []).map(([key, value]) => ({
                [key]: Number(value)
            })) 
        }
    }
}


export const analytics = new Analytics()