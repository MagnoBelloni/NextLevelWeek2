import { Request, Response } from 'express';

import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

interface IScheduleItem {
    week_day: number;
    from: string;
    to:string;
}

export default class ClassesController {
    async index(req: Request, res:Response) {
        const {week_day, subject, time} = req.query;

        if(!week_day || !subject || !time) {
            return res.status(400).json({
                error: 'Missing filters to search classes'
            });
        }

        const timeInMinutes = convertHourToMinutes(time as string);

        const classes = await db('classes')
            .whereExists(function(){
                this.select('class_schedule.*')
                .from('class_schedule')
                .whereRaw('`class_schedule`.`class_id`  = `classes`.`id`')
                .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                .whereRaw('`class_schedule`.`from` <= ??', [Number(timeInMinutes)])
                .whereRaw('`class_schedule`.`to` > ??', [Number(timeInMinutes)])
            })
            .where('classes.subject', '=', subject as string)
            .join('users', 'classes.user_id', '=', 'users.id')
            .select(['classes.*', 'users.*']);

        return res.send(classes);
    }

    async create(req: Request, res: Response) {
        const { name, avatar, whatsapp, bio, subject, cost, schedule } = req.body;
    
        const trx = await db.transaction();
    
        try {
            const insertedUsersId = await trx('users').insert({
                name,
                avatar,
                whatsapp,
                bio,
            });
        
            const user_id = insertedUsersId[0];
        
            const insertedClassesId = await trx('classes').insert({
                subject,
                cost,
                user_id
            });
        
            const class_id = insertedClassesId[0];
        
            const classSchedule = schedule.map((scheduleItem: IScheduleItem) => {
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to)
                };
            });
        
            await trx('class_schedule').insert(classSchedule);
            
            await trx.commit();
        
            return res.status(201).send('Success!');
        } catch (error) {
            await trx.rollback();
    
            return res.status(400).json({
                error: 'Unexspected error while creating new class'
            })
        }
    }
}
