import { Routes } from '@angular/router';
import { TodosComponent } from './components/todos/todos.component';
import { DeletedTodosComponent } from './components/deleted-todos/deleted-todos.component';

export const routes: Routes = [
    {
        path: '',
        component: TodosComponent
    },
    {
        path: 'todos',
        component: TodosComponent
    },
    {
        path:'deleted-todos',
        component: DeletedTodosComponent
    }
];
