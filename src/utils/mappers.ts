import { TaskDto } from 'models/Task';
import { User } from 'models/User';

export const mapAsTask = (row: TaskDto & User) => ({
    id: row.id,

    title: row.title,
    description: row.description,

    deadlineTimestamp: Number(row.deadlineTimestamp),
    creationTimestamp: Number(row.creationTimestamp),
    updateTimestamp: Number(row.updateTimestamp),

    priority: row.priority,
    status: row.status,

    responsibleUserId: row.responsibleUserId,
    creatorId: row.creatorId,
    responsibleUser: {
        id: row.responsibleUserId,

        firstName: row.firstName,
        lastName: row.lastName,
        patronymic: row.patronymic,

        login: row.login,
        directorId: row.directorId,
    },
});
