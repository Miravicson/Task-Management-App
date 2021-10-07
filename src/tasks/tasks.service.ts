import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

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
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find((task) => task.id === id);

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  createTask({ title, description }: CreateTaskDto): Task {
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  deleteTaskById(id: string): void {
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== found.id);
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    // const taskIndex = this.tasks.findIndex((task) => task.id === id);
    // this.tasks[taskIndex].status = status;
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }

  getTasksWithFilters(getTasksFilterDto: GetTasksFilterDto): Task[] {
    // return this.tasks.filter(filterBy(getTasksFilterDto));
    let tasks: Task[] = this.getAllTasks();
    const { search, status } = getTasksFilterDto;
    if (search) {
      const searchRegex = new RegExp(search, 'gi');
      tasks = tasks.filter((task) => {
        // return task.title.toLowerCase().includes(search.toLowerCase()) || task.description.toLowerCase().includes(search.toLowerCase());
        return searchRegex.test(task.id) || searchRegex.test(task.description);
      });
    }

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    return tasks;
  }
}
