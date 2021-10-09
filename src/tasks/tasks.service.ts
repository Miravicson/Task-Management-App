import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

function filterBy<T>(filterObject: T) {
  return (objectInstance) => {
    return Object.keys(filterObject).reduce((acc: boolean, key: string) => {
      acc = acc && objectInstance[key] === filterObject[key];
      return acc;
    }, true);
  };
}

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository) private tasksRepository: TasksRepository,
  ) {}
  // private tasks: Task[] = [];
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   // const taskIndex = this.tasks.findIndex((task) => task.id === id);
  //   // this.tasks[taskIndex].status = status;
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
  // getTasksWithFilters(getTasksFilterDto: GetTasksFilterDto): Task[] {
  //   // return this.tasks.filter(filterBy(getTasksFilterDto));
  //   let tasks: Task[] = this.getAllTasks();
  //   const { search, status } = getTasksFilterDto;
  //   if (search) {
  //     const searchRegex = new RegExp(search, 'gi');
  //     tasks = tasks.filter((task) => {
  //       // return task.title.toLowerCase().includes(search.toLowerCase()) || task.description.toLowerCase().includes(search.toLowerCase());
  //       return searchRegex.test(task.id) || searchRegex.test(task.description);
  //     });
  //   }
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   return tasks;
  // }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  async deleteTaskById(id: string): Promise<void> {
    const { affected } = await this.tasksRepository.delete(id);
    if (!affected) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    // my first implementation does not first check that the id exists
    // await this.tasksRepository.update(id, { status });
    // return this.getTaskById(id);

    // tutorial implementation
    const task = await this.getTaskById(id);
    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }
}
