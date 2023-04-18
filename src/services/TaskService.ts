import { ITaskRepository, TaskDto } from 'models/Task';

interface ITaskService {
    getTasks: () => Promise<TaskDto[]>;
}

/**
 * Позволяет взаимодействовать с задачами.
 */
export class TaskService implements ITaskService {
    taskRepository: ITaskRepository;

    constructor(taskRepository: ITaskRepository) {
        this.taskRepository = taskRepository;
    }

    /**
     * Получает список задач.
     * @returns список задач.
     */
    getTasks(): Promise<TaskDto[]> {
        return this.taskRepository.getAllTasks();
    }
}
