import { ITaskRepository, TaskDto } from 'models/Task';

interface ITaskService {
    getTasks: () => Promise<TaskDto[]>;
    trySaveTask: (task: TaskDto, userId: number) => void;
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

    /**
     * Пытается сохранить задачу.
     * @param task задача для сохранения.
     * @param userId автор задачи.
     * @throws `TaskSaveError` ошибка валидации задачи.
     */
    trySaveTask(task: TaskDto, userId: number): Promise<void> {
        return this.taskRepository.trySaveTask(task, userId);
    }
}
